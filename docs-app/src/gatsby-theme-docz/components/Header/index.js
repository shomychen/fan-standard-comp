/** @jsx jsx */
import { jsx, Box, Flex, useColorMode } from 'theme-ui'
import { useConfig, useCurrentDoc} from 'docz'

import * as styles from './styles'
import {  Menu} from '../Icons'

export const Header = props => {
  const { onOpen } = props
  const {
    repository,
    themeConfig,
  } = useConfig()
  const { edit = true, ...doc } = useCurrentDoc()
  const [colorMode, setColorMode] = useColorMode()

  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light')
  }
// console.log('themeConfig', themeConfig)
  return (
    <div sx={styles.wrapper} data-testid="header">
      <Box sx={styles.menuIcon}>
        <button sx={styles.menuButton} onClick={onOpen}>
          <Menu size={25} />
        </button>
      </Box>
      <div sx={styles.innerContainer}>
        通用组件库V1.0使用文档
        <Flex>
          <Box sx={{ mr: 2 }}>
            <a
              href={'http://118.24.88.87:8824/doc-v2/'}
              sx={styles.headerButton}
              target="_blank"
              title={'fan-standard-comp v2.0'}
              rel="noopener noreferrer"
            >
              V2.0
            </a>
          </Box>
        </Flex>
      </div>
    </div>
  )
}
