import baseTheme from 'gatsby-theme-docz/src/theme/index'
import { merge } from 'lodash/fp'

export default merge(baseTheme, {
  colors: {
    header: {
      // bg: 'tomato',
    }
  },
  styles:{
    table: {
      border: '1px solid #f0f0f0',
      'th,td ': {
        pr: "10px",
        py: "10px",
        pl: '10px',
        borderColor: "#f0f0f0"
      }
    },
    th: {
      ':first-child': {
        pl: '10px'
      },
      pl: '10px',
      pt: '10px',
      pb: '10px',
      pr: '10px',
      borderBottomWidth: '1px',
      bg: 'rgba(0,0,0,.02)'
    },
    td: {
      ':first-child': {
        pl: '10px'
      },
      pl: '10px',
      pt: '10px',
      pb: '10px',
      pr: '10px',
      borderBottomWidth: '1px',
      fontSize: '16px',
    }
  }
})
