import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    const users = [
        {id:1, name:'ail'},
        {id:2, name:'rahma'}
    ];
    return NextResponse.json({users, status:200});
}