import type { NextApiRequest, NextApiResponse } from 'next'
import type { Data } from '../../components/typings'

const apiEndPoint = "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth"

export const mockData: Data = {
  name: "abc",
  email: "lantianyou@gmail.com"
}

export default async function emailHandler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(apiEndPoint, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: req.body
  })
  res.status(response.status).json({messgae: response.statusText})
}