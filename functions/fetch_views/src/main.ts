import { Client, Databases, Query } from 'node-appwrite';

type FunctionContext = {
  req: {
    bodyRaw: string;
    body: any;
    headers: Record<string, string>;
    scheme: string;
    method: string;
    url: string;
    host: string;
    port: number;
    path: string;
    queryString: string;
    query: Record<string, string>;
  };
  res: {
    send: (body: any, statusCode?: number, headers?: Record<string, string>) => any;
    json: (obj: any, statusCode?: number, headers?: Record<string, string>) => any;
    empty: () => any;
    redirect: (url: string, statusCode?: number, headers?: Record<string, string>) => any;
  };
  log: (message: any) => void;
  error: (message: any) => void;
};

export default async ({ req, res, log, error }: FunctionContext) => {
  const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  const databases = new Databases(client);
  const DATABASE_ID = 'giews_db';
  const COLLECTION_ID = 'views';

  try {
    let slug: string | null = null;
    let style = 'terminal';

    if (req.path && req.path !== '/') {
      const parts = req.path.split('/').filter(p => p);
      if (parts.length > 0) slug = parts[0];
      if (parts.length > 1) style = parts[1];
    }

    if (!slug) {
      return res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="20"><text y="15" fill="red">Error: Invalid Path. Usage: /:slug/:style</text></svg>`, 400, {
          'Content-Type': 'image/svg+xml'
      });
    }

    if (style === 'glitch') {
       return res.send(`<?xml version="1.0" encoding="UTF-8"?>
       <svg width="400" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
           <text x="10" y="30" font-family="monospace" font-size="20" fill="red">Glitch style coming soon...</text>
       </svg>`, 200, {
          'Content-Type': 'image/svg+xml'
       });
    }
    
    // Find document
    const list = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('slug', slug)]
    );

    let count: number = 0;
    let docId: string | null = null;

    if (list.total > 0) {
      const doc = list.documents[0];
      count = doc.count + 1;
      docId = doc.$id;
      
      // Update count
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
        count: count
      });
    } else {
      count = 1;
      // Create new document
      const newDoc = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        'unique()',
        {
          slug: slug,
          count: count
        }
      );
      docId = newDoc.$id;
    }

    // Generate Retro SVG
    const PLACES = 7;
    const countArray = count.toString().padStart(PLACES, "0").split("");
    const parts = countArray.reduce(
      (acc: string, next: string, index: number) =>
        `${acc}
         <rect id="Rectangle" fill="#000000" x="${index * 32}" width="29" height="29"></rect>
         <text id="0" font-family="Courier" font-size="24" font-weight="normal" fill="#00FF13">
             <tspan x="${index * 32 + 7}" y="22">${next}</tspan>
         </text>
    `,
      ""
    );
    
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="${PLACES * 32}px" height="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Count</title>
        <g id="Page-1" font-family="monospace" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          ${parts}
        </g>
    </svg>
    `.trim();

    return res.send(svg, 200, {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'max-age=0, no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

  } catch (err: any) {
    error("Error: " + err.message);
    return res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20"><text y="15">Error</text></svg>`, 500, {
        'Content-Type': 'image/svg+xml'
    });
  }
};
