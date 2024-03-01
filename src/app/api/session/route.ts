'use server'
import { cookies } from 'next/headers'

type ResponseData = {
  message: string
}



export async function POST(req: Request) {
  
  const defaultErrorMsg = 'Oops! Something went wrong during sign-up. Please try again later.'
  try {

    
    const backEndUrl = (process.env.URL_API) ? process.env.URL_API : 'http://localhost:3009';
    const { email, password } = await req.json()

    const data = {
      email,
      password
    };

    const retorno = await fetch(`${backEndUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })

    const dataReturn = await retorno.json()

    if (! dataReturn?.access_token ) {
      const errorMessage = dataReturn?.message ?? defaultErrorMsg;
      cookies().delete('userSession')
      throw new Error(errorMessage);
    }

    cookies().set('userSession', dataReturn?.access_token)
    return new Response(JSON.stringify({message:'success'}), {
      status: 200,
      headers: { 'foi': 'foi' },
    })

  } catch (err: any) {

    return new Response( JSON.stringify({message:err?.message ?? defaultErrorMsg}), {
      status: 401,
      statusText: err?.message ?? defaultErrorMsg
    })
  }
}