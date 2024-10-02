// Local Storage Keys and Defaults
const LS_KEYS = {
    COMMANDS: "cli-page-commands",
    ENGINE: "cli-page-engine",
    BOOKMARKS: "cli-page-bookmarks",
    ICON: "cli-page-userIcon",
    NAME: "cli-page-name",
};
  
const DEFAULTS = {
    COMMANDS: "",
    ENGINE: "google",
    ICON: "static/tenor.gif",
    NAME: "User",
    BOOKMARKS: {},
};
  
const ENGINES = {
    google: "https://google.com/search?q=",
    bing: "https://www.bing.com/search?q=",
    ddg: "https://duckduckgo.com/?q=",
    youtube: "https://www.youtube.com/results?search_query=",
};
  
// Global Variables
let history = [];
let searchUrl, searchStr, bookmarks, userIcon, userName;
let historyIndex = 0;

// Utility Functions
const $ = (id) => document.getElementById(id);
const nl2br = (txt) => txt.replace(/\n/g, " ");
const readLocal = (key, defaultValue) => localStorage.getItem(key) || defaultValue;
const writeLocal = (key, value) => localStorage.setItem(key, value);
const readBookmarks = () => JSON.parse(localStorage.getItem(LS_KEYS.BOOKMARKS) || JSON.stringify(DEFAULTS.BOOKMARKS));
const writeBookmarks = (data) => writeLocal(LS_KEYS.BOOKMARKS, JSON.stringify(data));

// Rendering Functions
const renderName = () => $("name").innerText = userName;
const renderIcon = () => $("icon").src = userIcon;

const renderSearch = () => {
    const prePrompt = "search";
    const promptSymbol = "$";

    $("terminal-content").innerHTML = `<div class='prompt-title'>
      <span class="prePrompt">${prePrompt}</span><span class="atSymb">@</span><span class="promptSearch">${searchStr}</span><span class='prompt-cursor'>${promptSymbol}</span>
    </div>`
};

const renderInput = () => {
    $("terminalSearch").innerHTML = (`
        <input type="text" spellcheck="false" id="setter" autocomplete="off">
        <div id="getter"><span id="writer"></span></div>
    `);
};

const renderBookmarks = () => {
    $("bookmarks").innerHTML = Object.entries(bookmarks).map(([category, links]) =>
        `<div class="column">
            <h3>${category}</h3>
            ${Object.entries(links).map(([name, url]) => (
                `<a href="${url}"><h4>${name}</h4></a>`
            )).join("")}
        </div>`
    ).join("");
};

// Command Handlers
const handleName = (args) => {
    const name = args.join(" ");
    if (name) {
        userName = name;
        writeLocal(LS_KEYS.NAME, name);
        renderName();
    } else {
        alert(`Invalid name. Example: ${COMMANDS.name.example}`);
    }
};

const addIcon = (args) => {
    const url = args[0];
    const validateImageUrl = (url) => /^(https?:\/\/)[\w.-]+(\.[a-z]{2,})+([/?#].*)?$/i.test(url);

    if (validateImageUrl(url)) {
        userIcon = url;
        writeLocal(LS_KEYS.ICON, url);
        renderIcon();
    } else {
        alert(`Invalid icon URL. Example: ${COMMANDS.icon.example}`);
    }
};

const changeEngine = (args) => {
    const engine = args[0];
    if (ENGINES[engine]) {
        searchUrl = ENGINES[engine];
        searchStr = engine;
        writeLocal(LS_KEYS.ENGINE, engine);
    } else {
        searchStr = DEFAULTS.ENGINE;
        searchUrl = ENGINES.google;
        alert(`Valid search engine. Example: ${Object.keys(ENGINES).join(", ")}`);
    }
    renderSearch();
};

const executeSearch = (args) => {
    const query = args.join(" ");
    if (query) {
        window.location.replace(`${searchUrl}${query}`);
    }
};

const handleBookmarks = (args) => {
    const [command, category, name, url] = args;
    if (!category || !name || !url) {
        alert(`Invalid command. Example: ${COMMANDS.bookmark.example}`);
        return;
    }
  
    if (command === "-s") {
        bookmarks[category] = { ...(bookmarks[category] || {}), [name]: url };
    } else if (command === "-d") {
        if (bookmarks[category]) {
            delete bookmarks[category][name];
            if (Object.keys(bookmarks[category]).length === 0) delete bookmarks[category];
        }
    } else {
        alert(`Invalid command. Example: ${COMMANDS.bookmark.example}`);
        return;
    }
  
    writeBookmarks(bookmarks);
    renderBookmarks();
};

const showHelp = () => {
    $("help").innerHTML = `<div>
        <div id="commands">
            <h3><b>Commands</b></h3>
            <button class="btn" onclick="document.getElementById('help').innerHTML = ''">
                Close
            </button>
        </div>
        <ul>${Object.entries(COMMANDS).map(([cmd, { syntax, behavior }]) => (
            `<li><b>:${cmd}</b> - ${syntax} - ${behavior}</li>`
        )).join("")}</ul>
        <br/>
        <p>Valid Search Engines: ${Object.keys(ENGINES).join(", ")}</p>
        <p>Valid Bookmark Commands: -s to save, -d to delete</p>
    </div>`;
};

const resetData = () => {
    alert("Resetting all data");
    localStorage.clear();
};

// Command Definitions
const COMMANDS = {
    name: {
        func: handleName,
        syntax: ":name <name>",
        behavior: "Modify the name",
        example: ":name John Doe",
    },
    icon: {
        func: addIcon,
        syntax: ":icon <url>",
        behavior: "Modify the icon",
        example: ":icon https://example.com/icon.png",
    },
    searchEng: {
        func: changeEngine,
        syntax: ":searchEng <engine>",
        behavior: "Change search engine",
        example: ":searchEng google",
    },
    search: {
        func: executeSearch,
        syntax: ":search <query>",
        behavior: "Search the web",
        example: ":search How to code",
    },
    bookmark: {
        func: handleBookmarks,
        syntax: ":bookmark <command> <category> <name> <url>",
        behavior: "Add or remove a bookmark",
        example: ":bookmark -s Coding Github https://github.com",
    },
    reset: {
        func: resetData,
        syntax: ":reset",
        behavior: "Reset all data",
    },
    help: {
        func: showHelp,
        syntax: ":help",
        behavior: "Show help",
    },
};

// Event Handlers
const updatePrompt = (e) => $("writer").innerHTML = nl2br(e.target.value);
const focusSetter = () => $("terminalSearch").addEventListener('click', () => $("setter").focus());

const focusPrompt = () => {
    const input = $("setter");
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
};

const parseCommand = (input) => {
    history.push(input);
    writeLocal(LS_KEYS.COMMANDS, history);
    historyIndex = 0;
    return input.startsWith(":") ? input.slice(1).split(" ") : input;
};

const runCommand = (cmd) => {
    if (!cmd) return;

    const [command, ...args] = parseCommand(cmd);
    if (COMMANDS[command]) {
        COMMANDS[command].func(args);
    } else {
        executeSearch([cmd]);
    }
    renderInput();
    focusPrompt();
};

const handleKeyPresses = (e) => {
    switch (e.key) {
        case "Enter":
            e.preventDefault();
            runCommand($("setter").value);
            break;
        case "ArrowUp":
            e.preventDefault();
            if (historyIndex < history.length) {
                historyIndex++;
                $("setter").value = history[history.length - historyIndex] || "";
            }
            focusPrompt();
            break;
        case "ArrowDown":
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                $("setter").value = history[history.length - historyIndex] || "";
            } else {
                $("setter").value = "";
            }
            focusPrompt();
            break;
    }
};

// Initialize Application
(() => {
    history = readLocal(LS_KEYS.COMMANDS, DEFAULTS.COMMANDS).split(",");
    searchStr = readLocal(LS_KEYS.ENGINE, DEFAULTS.ENGINE);
    searchUrl = ENGINES[searchStr];
    bookmarks = readBookmarks();
    userIcon = readLocal(LS_KEYS.ICON, DEFAULTS.ICON);
    userName = readLocal(LS_KEYS.NAME, DEFAULTS.NAME);
  
    renderBookmarks();
    renderIcon();
    renderName();
    renderInput();
    renderSearch();
  
    document.addEventListener("keydown", handleKeyPresses);
    $("setter").addEventListener("input", updatePrompt);
    focusPrompt();
    focusSetter();
})();