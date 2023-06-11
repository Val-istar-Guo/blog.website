import { Keq } from 'keq'
import { request } from 'keq'
import { ArticleDto } from "./components/schemas/article_dto"

type Response_200_application_json = (ArticleDto)[]

interface QueryArg {
}

interface ParamArg {
}

interface HeaderArg {
}


export function fetchArticles(arg?: QueryArg & ParamArg & HeaderArg): Keq<Response_200_application_json> {
  const req = request.get<Response_200_application_json>("/articles")
    .option('module', {
      name: "backend",
      pathname: "/articles",
    })


  return req
}
