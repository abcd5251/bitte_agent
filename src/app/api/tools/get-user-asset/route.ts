import { NextResponse } from 'next/server';
import Debank from 'debank-re';

const debank = new Debank();

async function fetchUserData(address: string): Promise<number> {
    try {
        console.log("tttt")
        const user = await debank.get('/user', { id: address });
        console.log("uuu", user)
        return user.user.stats.usd_value;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');
        console.log("address", address)
        if (!address) {
            return NextResponse.json({ error: 'Address is required' }, { status: 400 });
        }

        const usdValue = await fetchUserData(address);
        console.log("uuu", usdValue)
        return NextResponse.json({ usdValue });
    } catch (error) {
        console.error('Error fetching Debank data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}