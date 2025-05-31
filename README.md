# TaskPilot  

TaskPilot is a simple, lightweight task management app built with **JavaScript, HTML, CSS/SCSS, and Bootstrap**. It helps users organise their tasks efficiently with a clean and interactive UI.  

## Features  
- Add, edit, and delete tasks  
- Drag-and-drop task organisation  
- Light & dark mode  
- LocalStorage for task persistence  
- Responsive design with Bootstrap  

## Technologies Used  
- **HTML5, CSS3 (SCSS), JavaScript**  
- **Bootstrap 5** for responsive design  
- **jQuery** for animations  
- **LocalStorage** for saving tasks  
- **Webpack** for bundling and development server
- **Jest** for unit testing
- **Cucumber** for end-to-end testing
- **Selenium WebDriver** for browser automation

## Getting Started  

### Clone the Repository  
```sh
git clone https://github.com/Nqobile-Buthelezi/task-pilot.git
cd task-pilot
```

### Install Dependencies
```sh
npm install
```

## Running the Application  

### Development Mode
To run the application in development mode with hot reloading:
```sh
npm run dev
```

### Production Build
To create a production build:
```sh
npm run build
```

### Local Server
To serve the application locally using the built files:
```sh
npm start
```

This will start a local server serving from the `src/` directory, and you can access the app at:
```sh
http://localhost:3000
```

## Testing

### Unit Tests
To run unit tests:
```sh
npm test
```

To run unit tests in watch mode (automatically re-runs when files change):
```sh
npm run test:watch
```

### End-to-End Tests
To run end-to-end tests:
```sh
npm run test:e2e
```

### Run All Tests
To run both unit and end-to-end tests:
```sh
npm run test:all
```

## Project Structure
```
task-pilot/
├── src/           # Source files
├── tests/         # Test files
├── package.json   # Project dependencies and scripts
└── README.md      # Project documentation
```

## Additional Notes

- The app is designed to be lightweight and works without a backend
- Uses ES6 modules (`"type": "module"` in package.json)
- Webpack handles development server and production builds
- Comprehensive testing setup with both unit tests (Jest) and E2E tests (Cucumber + Selenium)
- Contributions are welcome! Feel free to fork the repository and submit pull requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests to ensure everything works (`npm run test:all`)
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Issues

If you encounter any issues, please report them at: https://github.com/Nqobile-Buthelezi/task-pilot/issues