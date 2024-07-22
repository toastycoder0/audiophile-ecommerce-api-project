import { Router } from 'express'
import { readdirSync } from 'node:fs'
import { ROUTER_NAMES } from '../constants/path'

const formatFileName = (fileName: string) => fileName.split('.').shift()

const PATH_ROUTER = `${__dirname}`
const router = Router()

readdirSync(PATH_ROUTER).forEach((fileName) => {
  const formattedName = formatFileName(fileName)

  if (formattedName !== ROUTER_NAMES.index) {
    const PATH = formattedName === ROUTER_NAMES.root ? '/' : `/${formattedName}`
    import(`./${formattedName}`).then((module) => router.use(PATH, module.router))
  }
})

export default router
