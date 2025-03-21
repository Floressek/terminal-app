# Terminal Portfolio

A creative, interactive terminal-styled portfolio website built with React.

## Overview

This project is a personal portfolio website designed to mimic a terminal/command-line interface. It offers a unique and interactive way for visitors to explore information about me, my skills, projects, and contact details through familiar terminal commands.

## Features

- **Interactive Terminal Interface**: Type commands to navigate and explore content
- **Multiple Themes**: Choose between different visual themes (default, hacker, retro, synthwave)
- **Portfolio View**: Switch to a more traditional portfolio layout with a single command
- **Terminal Controls**: Minimize, maximize, and close the terminal just like a real application
- **Command History**: Navigate through previously entered commands using arrow keys
- **Easter Eggs**: Fun hidden commands and features to discover
- **Responsive Design**: Works on desktop and mobile devices

## Available Commands

| Command      | Description                                      |
|--------------|--------------------------------------------------|
| `help`       | Display a list of available commands             |
| `about`      | Display information about me                     |
| `projects`   | View my portfolio projects                       |
| `skills`     | Display my technical skills                      |
| `contact`    | Show my contact information                      |
| `interests`  | Display my personal interests                    |
| `education`  | Show my educational background                   |
| `portfolio`  | Switch to visual portfolio mode                  |
| `matrix`     | Enter the Matrix (Easter egg)                    |
| `quote`      | Display a random programming quote               |
| `clear`      | Clear the terminal screen                        |
| `theme`      | Change terminal theme (try: default, hacker, retro, synthwave) |

## Technologies Used

- React.js
- CSS3 (with custom animations)
- JavaScript ES6+
- React Hooks (useState, useEffect, useRef)
- HTML5

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   For Node.js versions 17 and above, you may need to use:
   ```bash
   set NODE_OPTIONS=--openssl-legacy-provider && npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Customization

### Personalizing Content

To update the portfolio with your information:

1. Open `src/Terminal.js`
2. Update the following variables:
    - `projects` array with your own projects
    - `skills` object with your technical skills
    - Command outputs in the `commands` object

### Adding New Commands

To add new commands:

1. Add your command function to the `commands` object in `src/Terminal.js`
2. Update the help text in the `help` command function
3. (Optional) Add any new styles needed in `src/Terminal.css`

### Changing Themes

To modify existing themes or add new ones:

1. Open `src/Terminal.css`
2. Find the theme section (search for `.theme-default`, `.theme-hacker`, etc.)
3. Update colors or add a new theme class

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Inspired by terminal/command-line interfaces
- Font used: Courier New, Monaco
- Terminal design inspired by macOS Terminal and popular code editors

---