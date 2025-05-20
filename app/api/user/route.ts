import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'BDD', 'user.json');

export async function POST(req: NextRequest) {
  try {
    const { email, password, action } = await req.json();
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(rawData);

    const existing = users.find((u: any) => u.email === email);

    if (action === 'login') {
      if (existing && existing.password === password) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: 'Email ou mot de passe incorrect.' });
      }
    }

    if (action === 'register') {
      if (existing) {
        return NextResponse.json({ success: false, message: 'Utilisateur déjà existant.' });
      }
      const newUser = { email, password };
      users.push(newUser);
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Action invalide.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur serveur.' }, { status: 500 });
  }
}
