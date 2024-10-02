<div align="center">
  <h1> Aesthetic Startpage </h1>
  <i> A distraction free, customizable startpage. </i>
</div>

<br>

<p align="center">
Discover a visually captivating and customizable browser startpage designed to elevate your browsing experience and productivity. This sleek platform offers a personalized search bar, you can easily choose your preferred search engine.
</p>

<hr>

## Features
- Minimal and stays out of your way, whilst being useful.
- **Customizable Search Bar:** Search the web using your preferred search engine. Easily switch between search engines by typing `:searchEng <search_engine>` in the input box. All other strings will search the web using the currently selected search engine. Search engines to choose from:
  - `google`
  - `youtube`
  - `bing`
  - `ddg`
- **Quick Access Links:** Conveniently placed beneath the search bar, these links provide easy access to your most frequently visited websites, acting as a lightweight bookmark system.
- **Edit Quick Links:** Easily add, remove, or modify the quick access links by typing `:bookmark <command> <category> <name> <url>` in the input box. Commands to choose from:
  - `s` to save a link
  - `d` to delete a link
- **Other Commands:** Additional commands to enhance your browsing experience:
  - `:name <name>` to set your name
  - `:icon <url>` to change the icon
  - `:reset` to reset the startpage to its default settings
  - `:help` to display a list of available commands


## Installation

Clone or download this repository.

```bash
git clone https://github.com/54nd339/NewTab.git
```

inspired from ([yuuushio](https://github.com/yuuushio/Browser-Startpage.git))

#### Chromium Browsers:

- Load the startpage as an unpacked extension:
  - Navigate to `chrome://extensions` in your browser.
  - Enable "Developer mode" using the toggle in the top-right corner.
  - Click "Load unpacked" and select the folder cloned repo folder.
  - The startpage will now be set as your new tab page.

#### Firefox
- Go to `about:addons` or select "Add-ons and Themes" from menu bar.
- Click the gear icon.
- Select "Install Add-on From File" from dropdown.
- Locate the cloned repo and select the `.xpi` file.
