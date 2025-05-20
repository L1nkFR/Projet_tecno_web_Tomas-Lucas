// app/api/disponibilites/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'BDD', 'disponibilites.json');

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const disponibilites = JSON.parse(data);
    return NextResponse.json(disponibilites);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur de lecture des données' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newItem = await req.json();
    const data = fs.readFileSync(filePath, 'utf-8');
    const disponibilites = JSON.parse(data);

    newItem.id = Date.now(); // simple ID unique
    disponibilites.push(newItem);

    fs.writeFileSync(filePath, JSON.stringify(disponibilites, null, 2));
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'ajout' }, { status: 500 });
  }
}
