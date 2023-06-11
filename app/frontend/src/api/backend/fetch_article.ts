import { Keq } from 'keq'
import { request } from 'keq'

type Response_200_application_json = string

interface QueryArg {
}

interface ParamArg {
    title: string
}

interface HeaderArg {
}


export function fetchArticle(arg?: QueryArg & ParamArg & HeaderArg): Keq<Response_200_application_json> {
  const req = request.get<Response_200_application_json>("/articles/:title")
    .option('module', {
      name: "backend",
      pathname: "/articles/:title",
    })

  if (arg && "title" in arg) req.params("title", String(arg["title"]))

  return req
}
