import type { PageServerLoad } from './$types';
import { API_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
    const res = await fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}`)

    if (!res.ok) return { rates: {} }


    const data = await res.json() as {
        success: true
        timestamp: number
        base: string
        date: string
        rates: { [key: string]: number }
    } |
    {
        success: false, error: {
            code: number
            type: string
            info: string
        }
    }

    console.log(data)

    return { rates: data.success ? data.rates : {} }

    // return { rates: {} }

};