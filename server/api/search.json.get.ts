import { serverQueryContent } from '#content/server'

export default eventHandler(async (event) => {
  return serverQueryContent(event).find()
})
