import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/indigo'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme ({
    palette:{
        primary: {
            main: blue[900]
        },
        secundary: {
            main: red[100],
        }
    }
})

export default theme;
