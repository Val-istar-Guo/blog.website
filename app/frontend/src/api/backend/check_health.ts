import { Keq } from 'keq'
import { request } from 'keq'

type Response_200_application_json = string

interface QueryArg {
}

interface ParamArg {
}

interface HeaderArg {
}


export function checkHealth(arg?: QueryArg & ParamArg & HeaderArg): Keq<Response_200_application_json> {
  const req = request.get<Response_200_application_json>("/")
    .option('module', {
      name: "backend",
      pathname: "/",
    })


  return req
}
