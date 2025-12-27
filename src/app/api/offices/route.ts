import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. Google Auth (Kimlik Doğrulama)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), // \n düzeltmesi şart
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Veriyi Çekme
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sayfa1!A2:K100', // Başlıkları atla (A2'den başla), K sütununa kadar
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // 3. Veriyi JSON Formatına Dönüştürme (Mapping)
    // Sütun sırasına DİKKAT ET (Sheet'teki sırayla aynı olmalı)
    const offices = rows.map((row) => ({
      id: parseInt(row[0]),
      eventName: row[1],
      locationLabel: row[2],
      pic: row[3],
      instagram: row[4] || undefined, // Boşsa undefined yap
      coordinates: {
        lat: parseFloat(row[5]), // String gelir, sayıya çevir
        lng: parseFloat(row[6]),
      },
      startTime: row[7],
      endTime: row[8],
      note: row[9] || '',
      type: row[10] || 'party',
    }));

    return NextResponse.json(offices);
  } catch (error) {
    console.error('Google Sheets Hatası:', error);
    return NextResponse.json({ error: 'Veri çekilemedi' }, { status: 500 });
  }
}

