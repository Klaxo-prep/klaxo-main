import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const MaterialUITheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#8d8fff',
            main: '#5762d5',
            dark: '#1038a4',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#59e5ae',
            main: '#04b27f',
            dark: '#008152',
            contrastText: '#222222',
        }
    },
    typography: {
        fontFamily: [
            '"Fira Sans"',
            'Roboto',
            'Quicksans',
            'Poppins',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});