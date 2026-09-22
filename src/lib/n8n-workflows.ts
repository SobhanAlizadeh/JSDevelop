export interface N8nNode {
  name: string;
  type: string;
  position: [number, number];
  params?: string;
}

export interface N8nConnection {
  from: string;
  to: string;
}

export interface N8nWorkflow {
  id: string;
  title: string;
  description: string;
  tags: string[];
  nodes: N8nNode[];
  connections: N8nConnection[];
  json: string;
}

export const n8nWorkflows: N8nWorkflow[] = [
  // ═══════════════════════════════════════════
  // ۱. ثبت سرنخ → CRM → ایمیل خوش‌آمد
  // ═══════════════════════════════════════════
  {
    id: "lead-crm",
    title: "ثبت سرنخ → CRM → ایمیل خوش‌آمد",
    description:
      "فرم سایت به‌محض ارسال، اعتبارسنجی می‌شود؛ سرنخ معتبر وارد Google Sheets شده، ایمیل خوش‌آمد می‌رود و تیم فروش در Slack اطلاع می‌گیرد.",
    tags: ["Google Sheets", "Gmail", "Slack", "Webhook"],
    nodes: [
      { name: "Webhook", type: "n8n-nodes-base.webhook", position: [40, 140], params: "POST /lead-form" },
      { name: "Validate Email", type: "n8n-nodes-base.if", position: [260, 140], params: "regex email check" },
      { name: "Add to Sheets", type: "n8n-nodes-base.googleSheets", position: [480, 140], params: "Append row → CRM" },
      { name: "Send Welcome", type: "n8n-nodes-base.gmail", position: [700, 140], params: "Gmail template" },
      { name: "Notify Sales", type: "n8n-nodes-base.slack", position: [920, 140], params: "#sales channel" },
    ],
    connections: [
      { from: "Webhook", to: "Validate Email" },
      { from: "Validate Email", to: "Add to Sheets" },
      { from: "Add to Sheets", to: "Send Welcome" },
      { from: "Send Welcome", to: "Notify Sales" },
    ],
    json: `{
  "name": "Lead Capture → CRM → Welcome",
  "nodes": [
    { "name": "Webhook", "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "lead-form", "httpMethod": "POST" } },
    { "name": "Validate Email", "type": "n8n-nodes-base.if",
      "parameters": { "conditions": { "string": [{ "value1": "={{ $json.email }}", "operation": "regex" }] } } },
    { "name": "Add to Sheets", "type": "n8n-nodes-base.googleSheets",
      "parameters": { "operation": "append", "sheetId": "crm-leads" } },
    { "name": "Send Welcome", "type": "n8n-nodes-base.gmail",
      "parameters": { "subject": "خوش آمدید 🎉" } },
    { "name": "Notify Sales", "type": "n8n-nodes-base.slack",
      "parameters": { "channel": "#sales", "text": "سرنخ جدید: {{ $json.name }}" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۲. گزارش روزانه خودکار فروش
  // ═══════════════════════════════════════════
  {
    id: "daily-report",
    title: "گزارش روزانه خودکار فروش",
    description:
      "هر روز رأس ساعت ۸ صبح، آمار فروش از API گرفته می‌شود، قالب‌بندی شده و به‌صورت گزارش در Telegram ارسال می‌گردد.",
    tags: ["Schedule", "HTTP", "Telegram", "Code"],
    nodes: [
      { name: "Schedule 8AM", type: "n8n-nodes-base.scheduleTrigger", position: [40, 140], params: "Cron: 0 8 * * *" },
      { name: "Fetch Stats", type: "n8n-nodes-base.httpRequest", position: [260, 140], params: "GET /api/sales" },
      { name: "Format Report", type: "n8n-nodes-base.code", position: [480, 140], params: "JS markdown builder" },
      { name: "Send Telegram", type: "n8n-nodes-base.telegram", position: [700, 140], params: "sendMessage → مدیران" },
    ],
    connections: [
      { from: "Schedule 8AM", to: "Fetch Stats" },
      { from: "Fetch Stats", to: "Format Report" },
      { from: "Format Report", to: "Send Telegram" },
    ],
    json: `{
  "name": "Daily Sales Report",
  "nodes": [
    { "name": "Schedule 8AM", "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": { "rule": { "interval": [{ "field": "cronExpression", "expression": "0 8 * * *" }] } } },
    { "name": "Fetch Stats", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api.example.com/sales/daily", "authentication": "headerAuth" } },
    { "name": "Format Report", "type": "n8n-nodes-base.code",
      "parameters": { "jsCode": "return [{ json: { report: buildTable(items) } }];" } },
    { "name": "Send Telegram", "type": "n8n-nodes-base.telegram",
      "parameters": { "chatId": "-100123456", "text": "={{ $json.report }}" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۳. پاسخ‌گوی هوشمند لینکدین با AI
  // ═══════════════════════════════════════════
  {
    id: "linkedin-ai-agent",
    title: "پاسخ‌گوی هوشمند لینکدین با AI",
    description:
      "پیام‌های لینکدین از طریق Unipile دریافت، با GPT-4 پاسخ هوشمند تولید و در Slack برای تأیید مدیر نمایش داده می‌شود. پس از تأیید، پاسخ به لینکدین ارسال می‌گردد.",
    tags: ["LinkedIn", "OpenAI", "Slack", "Unipile", "Notion"],
    nodes: [
      { name: "LinkedIn Webhook", type: "n8n-nodes-base.webhook", position: [40, 140], params: "POST /linkedin" },
      { name: "Global Variables", type: "n8n-nodes-base.set", position: [240, 140], params: "sender, message, chat_id" },
      { name: "Enrich Profile", type: "n8n-nodes-base.httpRequest", position: [440, 140], params: "Unipile API" },
      { name: "Notion DB", type: "n8n-nodes-base.notion", position: [640, 140], params: "پایگاه پاسخ‌ها" },
      { name: "AI Agent (GPT-4o)", type: "@n8n/n8n-nodes-langchain.agent", position: [840, 140], params: "پاسخ شخصی‌سازی‌شده" },
      { name: "Send to Slack", type: "n8n-nodes-base.slack", position: [1040, 140], params: "Approve / Archive" },
      { name: "Slack Button", type: "n8n-nodes-base.webhook", position: [1240, 140], params: "POST /approve" },
      { name: "Reply LinkedIn", type: "n8n-nodes-base.httpRequest", position: [1440, 140], params: "ارسال پاسخ نهایی" },
    ],
    connections: [
      { from: "LinkedIn Webhook", to: "Global Variables" },
      { from: "Global Variables", to: "Enrich Profile" },
      { from: "Enrich Profile", to: "Notion DB" },
      { from: "Notion DB", to: "AI Agent (GPT-4o)" },
      { from: "AI Agent (GPT-4o)", to: "Send to Slack" },
      { from: "Send to Slack", to: "Slack Button" },
      { from: "Slack Button", to: "Reply LinkedIn" },
    ],
    json: `{
  "name": "LinkedIn AI Agent",
  "nodes": [
    { "name": "LinkedIn Webhook", "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "linkedin", "httpMethod": "POST" } },
    { "name": "Global Variables", "type": "n8n-nodes-base.set",
      "parameters": { "assignments": ["sender", "message", "chat_id", "sender_id"] } },
    { "name": "Enrich Profile", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api9.unipile.com/api/v1/users/{{sender_id}}" } },
    { "name": "Notion DB", "type": "n8n-nodes-base.notion",
      "parameters": { "resource": "databasePage", "operation": "getAll" } },
    { "name": "AI Agent (GPT-4o)", "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": { "model": "gpt-4o", "systemMessage": "Expert LinkedIn assistant" } },
    { "name": "Send to Slack", "type": "n8n-nodes-base.slack",
      "parameters": { "blocksUi": "Approve / Archive buttons" } },
    { "name": "Slack Button", "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "approve", "httpMethod": "POST" } },
    { "name": "Reply LinkedIn", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "method": "POST", "url": "/api/v1/chats/{{chat_id}}/messages" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۴. مغز دوم شخصی در تلگرام
  // ═══════════════════════════════════════════
  {
    id: "second-brain",
    title: "مغز دوم شخصی در تلگرام",
    description:
      "لینک‌های ارسالی به ربات تلگرام به‌صورت خودکار خوانده، خلاصه و دسته‌بندی می‌شوند. ذخیره در Google Sheets و جستجوی معنایی با Supabase + Gemini.",
    tags: ["Telegram", "Google Sheets", "Supabase", "Gemini", "RAG"],
    nodes: [
      { name: "Telegram Trigger", type: "n8n-nodes-base.telegramTrigger", position: [40, 140], params: "پیام‌های جدید" },
      { name: "Brain Agent", type: "@n8n/n8n-nodes-langchain.agent", position: [240, 140], params: "مسیریابی URL / سوال" },
      { name: "Clean URL", type: "n8n-nodes-base.set", position: [440, 140], params: "حذف UTM" },
      { name: "Read (Jina)", type: "n8n-nodes-base.httpRequest", position: [640, 140], params: "r.jina.ai" },
      { name: "AI Librarian", type: "@n8n/n8n-nodes-langchain.chainLlm", position: [840, 140], params: "title + summary" },
      { name: "Save to Sheets", type: "n8n-nodes-base.googleSheets", position: [1040, 140], params: "Upsert روی URL" },
      { name: "Gemini Embed", type: "@n8n/n8n-nodes-langchain.embeddingsGoogleGemini", position: [1240, 140], params: "gemini-embedding-2" },
      { name: "Supabase Store", type: "@n8n/n8n-nodes-langchain.vectorStoreSupabase", position: [1440, 140], params: "ذخیره بردارها" },
    ],
    connections: [
      { from: "Telegram Trigger", to: "Brain Agent" },
      { from: "Brain Agent", to: "Clean URL" },
      { from: "Clean URL", to: "Read (Jina)" },
      { from: "Read (Jina)", to: "AI Librarian" },
      { from: "AI Librarian", to: "Save to Sheets" },
      { from: "Save to Sheets", to: "Gemini Embed" },
      { from: "Gemini Embed", to: "Supabase Store" },
    ],
    json: `{
  "name": "Second Brain - Link Library",
  "nodes": [
    { "name": "Telegram Trigger", "type": "n8n-nodes-base.telegramTrigger",
      "parameters": { "updates": ["message"] } },
    { "name": "Brain Agent", "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": { "tools": ["save_link", "search_library", "search_content"] } },
    { "name": "Clean URL", "type": "n8n-nodes-base.set",
      "parameters": { "assignments": ["url (strip UTM)", "note"] } },
    { "name": "Read (Jina)", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://r.jina.ai/{{url}}" } },
    { "name": "AI Librarian", "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "parameters": { "model": "gemini-flash-latest" } },
    { "name": "Save to Sheets", "type": "n8n-nodes-base.googleSheets",
      "parameters": { "operation": "appendOrUpdate", "matchingColumns": ["URL"] } },
    { "name": "Gemini Embed", "type": "@n8n/n8n-nodes-langchain.embeddingsGoogleGemini",
      "parameters": { "modelName": "gemini-embedding-2" } },
    { "name": "Supabase Store", "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
      "parameters": { "mode": "insert", "tableName": "documents" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۵. ربات پشتیبانی داخلی با Qdrant
  // ═══════════════════════════════════════════
  {
    id: "internal-knowledge-bot",
    title: "ربات پشتیبانی داخلی با Qdrant",
    description:
      "اسناد Google Drive به‌صورت خودکار استخراج و با OpenAI embedding به Qdrant اضافه می‌شوند. سوالات Slack با RAG پاسخ داده می‌شوند.",
    tags: ["Google Drive", "Qdrant", "OpenAI", "Slack", "RAG"],
    nodes: [
      { name: "Drive Trigger", type: "n8n-nodes-base.googleDriveTrigger", position: [40, 140], params: "فایل‌های جدید" },
      { name: "Download File", type: "n8n-nodes-base.googleDrive", position: [240, 140], params: "دانلود محتوا" },
      { name: "Route by Type", type: "n8n-nodes-base.switch", position: [440, 140], params: "PDF / DOCX / TXT" },
      { name: "Extract Text", type: "n8n-nodes-base.extractFromFile", position: [640, 140], params: "استخراج متن" },
      { name: "Delete Old Vec", type: "n8n-nodes-base.httpRequest", position: [840, 140], params: "Qdrant delete" },
      { name: "OpenAI Embed", type: "@n8n/n8n-nodes-langchain.embeddingsOpenAi", position: [1040, 140], params: "text-embedding-3" },
      { name: "Qdrant Insert", type: "@n8n/n8n-nodes-langchain.vectorStoreQdrant", position: [1240, 140], params: "company_docs" },
      { name: "Support Agent", type: "@n8n/n8n-nodes-langchain.agent", position: [1440, 140], params: "GPT-4o-mini + RAG" },
    ],
    connections: [
      { from: "Drive Trigger", to: "Download File" },
      { from: "Download File", to: "Route by Type" },
      { from: "Route by Type", to: "Extract Text" },
      { from: "Extract Text", to: "Delete Old Vec" },
      { from: "Delete Old Vec", to: "OpenAI Embed" },
      { from: "OpenAI Embed", to: "Qdrant Insert" },
      { from: "Qdrant Insert", to: "Support Agent" },
    ],
    json: `{
  "name": "Internal Document Support Bot",
  "nodes": [
    { "name": "Drive Trigger", "type": "n8n-nodes-base.googleDriveTrigger",
      "parameters": { "event": "fileCreated", "triggerOn": "specificFolder" } },
    { "name": "Download File", "type": "n8n-nodes-base.googleDrive",
      "parameters": { "operation": "download", "fileId": "={{ $json.id }}" } },
    { "name": "Route by Type", "type": "n8n-nodes-base.switch",
      "parameters": { "rules": ["PDF", "DOCX", "GoogleDoc", "TXT"] } },
    { "name": "Extract Text", "type": "n8n-nodes-base.extractFromFile",
      "parameters": { "operation": "text" } },
    { "name": "Delete Old Vec", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "method": "POST", "url": "qdrant.io/collections/company_docs/points/delete" } },
    { "name": "OpenAI Embed", "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
      "parameters": { "model": "text-embedding-3-small" } },
    { "name": "Qdrant Insert", "type": "@n8n/n8n-nodes-langchain.vectorStoreQdrant",
      "parameters": { "mode": "insert", "qdrantCollection": "company_docs" } },
    { "name": "Support Agent", "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": { "model": "gpt-4o-mini", "tools": ["Qdrant RAG"] } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۶. اتوماسیون ایمیل مارکتینگ با AI
  // ═══════════════════════════════════════════
  {
    id: "email-marketing-ai",
    title: "اتوماسیون ایمیل مارکتینگ با AI",
    description:
      "مشترکین جدید از فرم سایت، بر اساس رفتارشان دسته‌بندی می‌شوند. AI محتوای شخصی‌سازی‌شده تولید و ایمیل‌ها به‌صورت زمان‌بندی‌شده ارسال می‌شوند.",
    tags: ["Mailchimp", "OpenAI", "Google Sheets", "HubSpot"],
    nodes: [
      { name: "Form Submit", type: "n8n-nodes-base.webhook", position: [40, 140], params: "POST /subscribe" },
      { name: "Save Lead", type: "n8n-nodes-base.googleSheets", position: [240, 140], params: "ذخیره در Sheet" },
      { name: "AI Segment", type: "@n8n/n8n-nodes-langchain.agent", position: [440, 140], params: "دسته‌بندی هوشمند" },
      { name: "Generate Content", type: "@n8n/n8n-nodes-langchain.chainLlm", position: [640, 140], params: "GPT-4o تولید متن" },
      { name: "Schedule Wait", type: "n8n-nodes-base.wait", position: [840, 140], params: "۲۴ ساعت تأخیر" },
      { name: "Send Mailchimp", type: "n8n-nodes-base.mailchimp", position: [1040, 140], params: "ارسال ایمیل" },
      { name: "Sync HubSpot", type: "n8n-nodes-base.hubspot", position: [1240, 140], params: "به‌روزرسانی CRM" },
    ],
    connections: [
      { from: "Form Submit", to: "Save Lead" },
      { from: "Save Lead", to: "AI Segment" },
      { from: "AI Segment", to: "Generate Content" },
      { from: "Generate Content", to: "Schedule Wait" },
      { from: "Schedule Wait", to: "Send Mailchimp" },
      { from: "Send Mailchimp", to: "Sync HubSpot" },
    ],
    json: `{
  "name": "AI Email Marketing Automation",
  "nodes": [
    { "name": "Form Submit", "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "subscribe", "httpMethod": "POST" } },
    { "name": "Save Lead", "type": "n8n-nodes-base.googleSheets",
      "parameters": { "operation": "append", "sheetId": "subscribers" } },
    { "name": "AI Segment", "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": { "systemMessage": "Classify user intent and segment" } },
    { "name": "Generate Content", "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "parameters": { "model": "gpt-4o", "prompt": "Personalized email based on segment" } },
    { "name": "Schedule Wait", "type": "n8n-nodes-base.wait",
      "parameters": { "amount": 24, "unit": "hours" } },
    { "name": "Send Mailchimp", "type": "n8n-nodes-base.mailchimp",
      "parameters": { "resource": "campaign", "operation": "send" } },
    { "name": "Sync HubSpot", "type": "n8n-nodes-base.hubspot",
      "parameters": { "resource": "contact", "operation": "update" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۷. پردازش سفارش فروشگاهی
  // ═══════════════════════════════════════════
  {
    id: "ecommerce-orders",
    title: "پردازش سفارش فروشگاه آنلاین",
    description:
      "سفارش‌های Shopify به‌صورت خودکار پردازش، فاکتور PDF تولید، به انبار اطلاع و پیامک تحویل برای مشتری ارسال می‌شود. همه‌چیز در Notion ثبت می‌شود.",
    tags: ["Shopify", "Stripe", "Notion", "PDF", "SMS"],
    nodes: [
      { name: "Shopify Trigger", type: "n8n-nodes-base.shopifyTrigger", position: [40, 140], params: "order.created" },
      { name: "Verify Payment", type: "n8n-nodes-base.stripe", position: [240, 140], params: "بررسی وضعیت پرداخت" },
      { name: "Generate Invoice", type: "n8n-nodes-base.html", position: [440, 140], params: "تولید HTML فاکتور" },
      { name: "Convert to PDF", type: "n8n-nodes-base.httpRequest", position: [640, 140], params: "html2pdf API" },
      { name: "Notify Warehouse", type: "n8n-nodes-base.slack", position: [840, 140], params: "پیام به انبار" },
      { name: "Send SMS", type: "n8n-nodes-base.httpRequest", position: [1040, 140], params: "Kavenegar API" },
      { name: "Log to Notion", type: "n8n-nodes-base.notion", position: [1240, 140], params: "ثبت در Orders DB" },
    ],
    connections: [
      { from: "Shopify Trigger", to: "Verify Payment" },
      { from: "Verify Payment", to: "Generate Invoice" },
      { from: "Generate Invoice", to: "Convert to PDF" },
      { from: "Convert to PDF", to: "Notify Warehouse" },
      { from: "Notify Warehouse", to: "Send SMS" },
      { from: "Send SMS", to: "Log to Notion" },
    ],
    json: `{
  "name": "E-commerce Order Processing",
  "nodes": [
    { "name": "Shopify Trigger", "type": "n8n-nodes-base.shopifyTrigger",
      "parameters": { "topic": "orders/create" } },
    { "name": "Verify Payment", "type": "n8n-nodes-base.stripe",
      "parameters": { "resource": "paymentIntent", "operation": "get" } },
    { "name": "Generate Invoice", "type": "n8n-nodes-base.html",
      "parameters": { "html": "invoice-template.html" } },
    { "name": "Convert to PDF", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://html2pdf.app/api", "method": "POST" } },
    { "name": "Notify Warehouse", "type": "n8n-nodes-base.slack",
      "parameters": { "channel": "#warehouse", "text": "سفارش جدید: {{ $json.order_id }}" } },
    { "name": "Send SMS", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api.kavenegar.com/v1/sms/send.json" } },
    { "name": "Log to Notion", "type": "n8n-nodes-base.notion",
      "parameters": { "resource": "databasePage", "operation": "create" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۸. زمان‌بندی شبکه‌های اجتماعی
  // ═══════════════════════════════════════════
  {
    id: "social-scheduler",
    title: "زمان‌بندی پست شبکه‌های اجتماعی",
    description:
      "محتوای Notion هر روز بررسی، با AI تصاویر و کپشن‌های اختصاصی تولید و به‌صورت زمان‌بندی‌شده در اینستاگرام، توییتر و لینکدین منتشر می‌شود.",
    tags: ["Notion", "OpenAI", "Instagram", "Twitter", "LinkedIn", "DALL-E"],
    nodes: [
      { name: "Daily Schedule", type: "n8n-nodes-base.scheduleTrigger", position: [40, 140], params: "۹ صبح هر روز" },
      { name: "Fetch Notion", type: "n8n-nodes-base.notion", position: [240, 140], params: "پست‌های امروز" },
      { name: "Generate Caption", type: "@n8n/n8n-nodes-langchain.chainLlm", position: [440, 140], params: "GPT-4o کپشن" },
      { name: "Generate Image", type: "n8n-nodes-base.openAi", position: [640, 140], params: "DALL-E 3 تصویر" },
      { name: "Post Instagram", type: "n8n-nodes-base.httpRequest", position: [840, 140], params: "Graph API" },
      { name: "Post Twitter", type: "n8n-nodes-base.twitter", position: [1040, 140], params: "Tweet" },
      { name: "Post LinkedIn", type: "n8n-nodes-base.httpRequest", position: [1240, 140], params: "LinkedIn API" },
      { name: "Log Analytics", type: "n8n-nodes-base.googleSheets", position: [1440, 140], params: "ثبت در Sheet" },
    ],
    connections: [
      { from: "Daily Schedule", to: "Fetch Notion" },
      { from: "Fetch Notion", to: "Generate Caption" },
      { from: "Generate Caption", to: "Generate Image" },
      { from: "Generate Image", to: "Post Instagram" },
      { from: "Post Instagram", to: "Post Twitter" },
      { from: "Post Twitter", to: "Post LinkedIn" },
      { from: "Post LinkedIn", to: "Log Analytics" },
    ],
    json: `{
  "name": "Social Media Content Scheduler",
  "nodes": [
    { "name": "Daily Schedule", "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": { "rule": { "interval": [{ "field": "cronExpression", "expression": "0 9 * * *" }] } } },
    { "name": "Fetch Notion", "type": "n8n-nodes-base.notion",
      "parameters": { "resource": "databasePage", "operation": "getAll",
        "filter": { "property": "Publish Date", "date": { "equals": "={{ $today }}" } } } },
    { "name": "Generate Caption", "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "parameters": { "model": "gpt-4o", "prompt": "Social caption + hashtags" } },
    { "name": "Generate Image", "type": "n8n-nodes-base.openAi",
      "parameters": { "resource": "image", "operation": "generate", "model": "dall-e-3" } },
    { "name": "Post Instagram", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://graph.facebook.com/v18.0/me/media", "method": "POST" } },
    { "name": "Post Twitter", "type": "n8n-nodes-base.twitter",
      "parameters": { "resource": "tweet", "operation": "create" } },
    { "name": "Post LinkedIn", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api.linkedin.com/v2/ugcPosts", "method": "POST" } },
    { "name": "Log Analytics", "type": "n8n-nodes-base.googleSheets",
      "parameters": { "operation": "append", "sheetId": "social-posts-log" } }
  ]
}`,
  },
  // ═══════════════════════════════════════════
  // ۹. استخدام و زمان‌بندی مصاحبه با AI
  // ═══════════════════════════════════════════
  {
    id: "recruitment-ai",
    title: "استخدام و زمان‌بندی مصاحبه با AI",
    description:
      "رزومه‌های ارسالی از فرم استخدام به‌صورت خودکار با AI تحلیل و امتیازدهی می‌شوند. کاندیداهای واجد شرایط در Google Calendar زمان‌بندی شده و ایمیل دعوت به مصاحبه ارسال می‌گردد.",
    tags: ["Webhook", "OpenAI", "Google Calendar", "Gmail", "Airtable"],
    nodes: [
      { name: "Resume Webhook", type: "n8n-nodes-base.webhook", position: [40, 140], params: "POST /apply" },
      { name: "Extract Resume Text", type: "n8n-nodes-base.extractFromFile", position: [240, 140], params: "PDF → متن" },
      { name: "AI Score Candidate", type: "@n8n/n8n-nodes-langchain.chainLlm", position: [440, 140], params: "GPT-4o امتیازدهی" },
      { name: "Save to Airtable", type: "n8n-nodes-base.airtable", position: [640, 140], params: "پایگاه کاندیداها" },
      { name: "Qualified?", type: "n8n-nodes-base.if", position: [840, 140], params: "امتیاز > ۷۰" },
      { name: "Book Interview", type: "n8n-nodes-base.googleCalendar", position: [1040, 140], params: "ایجاد رویداد" },
      { name: "Send Invite Email", type: "n8n-nodes-base.gmail", position: [1240, 140], params: "دعوت به مصاحبه" },
    ],
    connections: [
      { from: "Resume Webhook", to: "Extract Resume Text" },
      { from: "Extract Resume Text", to: "AI Score Candidate" },
      { from: "AI Score Candidate", to: "Save to Airtable" },
      { from: "Save to Airtable", to: "Qualified?" },
      { from: "Qualified?", to: "Book Interview" },
      { from: "Book Interview", to: "Send Invite Email" },
    ],
    json: `{
  "name": "AI Recruitment & Interview Scheduling",
  "nodes": [
    { "name": "Resume Webhook", "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "apply", "httpMethod": "POST" } },
    { "name": "Extract Resume Text", "type": "n8n-nodes-base.extractFromFile",
      "parameters": { "operation": "text" } },
    { "name": "AI Score Candidate", "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "parameters": { "model": "gpt-4o", "prompt": "Score resume against job requirements 0-100" } },
    { "name": "Save to Airtable", "type": "n8n-nodes-base.airtable",
      "parameters": { "operation": "create", "table": "Candidates" } },
    { "name": "Qualified?", "type": "n8n-nodes-base.if",
      "parameters": { "conditions": { "number": [{ "value1": "={{ $json.score }}", "operation": "larger", "value2": 70 }] } } },
    { "name": "Book Interview", "type": "n8n-nodes-base.googleCalendar",
      "parameters": { "operation": "create", "calendar": "hiring@company.com" } },
    { "name": "Send Invite Email", "type": "n8n-nodes-base.gmail",
      "parameters": { "subject": "دعوت به مصاحبه شغلی" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۱۰. تیکتینگ پشتیبانی مشتری با AI
  // ═══════════════════════════════════════════
  {
    id: "support-ticketing-ai",
    title: "تیکتینگ پشتیبانی مشتری با AI",
    description:
      "تیکت‌های Zendesk با AI دسته‌بندی و اولویت‌بندی می‌شوند. سوالات ساده مستقیماً پاسخ داده شده و موارد پیچیده به کارشناس مربوطه در Slack ارجاع می‌گردد.",
    tags: ["Zendesk", "OpenAI", "Slack", "RAG"],
    nodes: [
      { name: "Zendesk Trigger", type: "n8n-nodes-base.zendeskTrigger", position: [40, 140], params: "تیکت جدید" },
      { name: "Classify Ticket", type: "@n8n/n8n-nodes-langchain.chainLlm", position: [240, 140], params: "دسته‌بندی + اولویت" },
      { name: "Can Auto-Reply?", type: "n8n-nodes-base.if", position: [440, 140], params: "اعتماد بالا" },
      { name: "AI Draft Reply", type: "@n8n/n8n-nodes-langchain.agent", position: [640, 260], params: "RAG از مستندات" },
      { name: "Update Ticket", type: "n8n-nodes-base.zendesk", position: [840, 260], params: "پاسخ خودکار" },
      { name: "Route to Agent", type: "n8n-nodes-base.slack", position: [640, 40], params: "ارجاع به تیم فنی" },
    ],
    connections: [
      { from: "Zendesk Trigger", to: "Classify Ticket" },
      { from: "Classify Ticket", to: "Can Auto-Reply?" },
      { from: "Can Auto-Reply?", to: "AI Draft Reply" },
      { from: "AI Draft Reply", to: "Update Ticket" },
      { from: "Can Auto-Reply?", to: "Route to Agent" },
    ],
    json: `{
  "name": "AI Customer Support Ticketing",
  "nodes": [
    { "name": "Zendesk Trigger", "type": "n8n-nodes-base.zendeskTrigger",
      "parameters": { "event": "ticket.created" } },
    { "name": "Classify Ticket", "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "parameters": { "model": "gpt-4o-mini", "prompt": "Classify category, priority, confidence" } },
    { "name": "Can Auto-Reply?", "type": "n8n-nodes-base.if",
      "parameters": { "conditions": { "number": [{ "value1": "={{ $json.confidence }}", "operation": "larger", "value2": 0.85 }] } } },
    { "name": "AI Draft Reply", "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": { "model": "gpt-4o", "tools": ["knowledge_base_search"] } },
    { "name": "Update Ticket", "type": "n8n-nodes-base.zendesk",
      "parameters": { "operation": "update", "comment": "={{ $json.reply }}" } },
    { "name": "Route to Agent", "type": "n8n-nodes-base.slack",
      "parameters": { "channel": "#support-escalation" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۱۱. تطبیق فاکتور و حسابداری خودکار
  // ═══════════════════════════════════════════
  {
    id: "invoice-reconciliation",
    title: "تطبیق فاکتور و حسابداری خودکار",
    description:
      "فاکتورهای دریافتی از ایمیل استخراج، اطلاعات کلیدی با AI خوانده شده و با سفارش خرید در سیستم حسابداری تطبیق داده می‌شود. مغایرت‌ها به تیم مالی گزارش می‌گردد.",
    tags: ["Gmail", "OpenAI", "QuickBooks", "Google Sheets"],
    nodes: [
      { name: "Gmail Trigger", type: "n8n-nodes-base.gmailTrigger", position: [40, 140], params: "ایمیل با پیوست PDF" },
      { name: "Extract Invoice Data", type: "@n8n/n8n-nodes-langchain.agent", position: [240, 140], params: "OCR + AI استخراج" },
      { name: "Fetch PO", type: "n8n-nodes-base.quickbooks", position: [440, 140], params: "سفارش خرید مرتبط" },
      { name: "Match Amounts", type: "n8n-nodes-base.code", position: [640, 140], params: "مقایسه مبالغ" },
      { name: "Mismatch?", type: "n8n-nodes-base.if", position: [840, 140], params: "اختلاف > ۰" },
      { name: "Create Bill", type: "n8n-nodes-base.quickbooks", position: [1040, 40], params: "ثبت فاکتور" },
      { name: "Flag Finance Team", type: "n8n-nodes-base.slack", position: [1040, 260], params: "هشدار مغایرت" },
    ],
    connections: [
      { from: "Gmail Trigger", to: "Extract Invoice Data" },
      { from: "Extract Invoice Data", to: "Fetch PO" },
      { from: "Fetch PO", to: "Match Amounts" },
      { from: "Match Amounts", to: "Mismatch?" },
      { from: "Mismatch?", to: "Create Bill" },
      { from: "Mismatch?", to: "Flag Finance Team" },
    ],
    json: `{
  "name": "Invoice Reconciliation Automation",
  "nodes": [
    { "name": "Gmail Trigger", "type": "n8n-nodes-base.gmailTrigger",
      "parameters": { "filters": { "hasAttachment": true } } },
    { "name": "Extract Invoice Data", "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": { "model": "gpt-4o", "tools": ["pdf_ocr"] } },
    { "name": "Fetch PO", "type": "n8n-nodes-base.quickbooks",
      "parameters": { "resource": "purchaseOrder", "operation": "get" } },
    { "name": "Match Amounts", "type": "n8n-nodes-base.code",
      "parameters": { "jsCode": "return [{ json: { diff: invoiceTotal - poTotal } }];" } },
    { "name": "Mismatch?", "type": "n8n-nodes-base.if",
      "parameters": { "conditions": { "number": [{ "value1": "={{ $json.diff }}", "operation": "notEqual", "value2": 0 }] } } },
    { "name": "Create Bill", "type": "n8n-nodes-base.quickbooks",
      "parameters": { "resource": "bill", "operation": "create" } },
    { "name": "Flag Finance Team", "type": "n8n-nodes-base.slack",
      "parameters": { "channel": "#finance-alerts" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۱۲. هشدار موجودی انبار
  // ═══════════════════════════════════════════
  {
    id: "inventory-alert",
    title: "هشدار و سفارش خودکار موجودی انبار",
    description:
      "موجودی محصولات هر ساعت از سیستم انبار بررسی می‌شود. در صورت رسیدن به آستانه بحرانی، سفارش خرید خودکار به تأمین‌کننده ارسال و تیم انبارداری مطلع می‌شود.",
    tags: ["Schedule", "PostgreSQL", "Slack", "Gmail"],
    nodes: [
      { name: "Hourly Check", type: "n8n-nodes-base.scheduleTrigger", position: [40, 140], params: "هر ۱ ساعت" },
      { name: "Query Stock", type: "n8n-nodes-base.postgres", position: [240, 140], params: "SELECT کالاهای کم‌موجود" },
      { name: "Low Stock?", type: "n8n-nodes-base.if", position: [440, 140], params: "موجودی < حداقل" },
      { name: "Generate PO", type: "n8n-nodes-base.code", position: [640, 140], params: "محاسبه مقدار سفارش" },
      { name: "Email Supplier", type: "n8n-nodes-base.gmail", position: [840, 140], params: "سفارش خرید" },
      { name: "Notify Warehouse", type: "n8n-nodes-base.slack", position: [1040, 140], params: "#انبار" },
    ],
    connections: [
      { from: "Hourly Check", to: "Query Stock" },
      { from: "Query Stock", to: "Low Stock?" },
      { from: "Low Stock?", to: "Generate PO" },
      { from: "Generate PO", to: "Email Supplier" },
      { from: "Email Supplier", to: "Notify Warehouse" },
    ],
    json: `{
  "name": "Inventory Stock Alert & Reorder",
  "nodes": [
    { "name": "Hourly Check", "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": { "rule": { "interval": [{ "field": "hours" }] } } },
    { "name": "Query Stock", "type": "n8n-nodes-base.postgres",
      "parameters": { "query": "SELECT * FROM inventory WHERE qty < min_threshold" } },
    { "name": "Low Stock?", "type": "n8n-nodes-base.if",
      "parameters": { "conditions": { "number": [{ "value1": "={{ $json.qty }}", "operation": "smaller", "value2": "={{ $json.min_threshold }}" }] } } },
    { "name": "Generate PO", "type": "n8n-nodes-base.code",
      "parameters": { "jsCode": "return [{ json: { orderQty: item.max_threshold - item.qty } }];" } },
    { "name": "Email Supplier", "type": "n8n-nodes-base.gmail",
      "parameters": { "subject": "سفارش خرید جدید - {{ $json.sku }}" } },
    { "name": "Notify Warehouse", "type": "n8n-nodes-base.slack",
      "parameters": { "channel": "#warehouse" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۱۳. ثبت‌نام و یادآوری وبینار
  // ═══════════════════════════════════════════
  {
    id: "webinar-registration",
    title: "ثبت‌نام و یادآوری وبینار",
    description:
      "ثبت‌نام‌کنندگان وبینار در Zoom و Google Sheets ذخیره می‌شوند. یک روز قبل و یک ساعت قبل از رویداد، یادآوری خودکار از طریق ایمیل و پیامک ارسال می‌گردد.",
    tags: ["Zoom", "Google Sheets", "Gmail", "SMS", "Wait"],
    nodes: [
      { name: "Registration Webhook", type: "n8n-nodes-base.webhook", position: [40, 140], params: "POST /register" },
      { name: "Create Zoom Reg", type: "n8n-nodes-base.zoom", position: [240, 140], params: "ثبت‌نام Zoom" },
      { name: "Log to Sheets", type: "n8n-nodes-base.googleSheets", position: [440, 140], params: "لیست شرکت‌کنندگان" },
      { name: "Confirm Email", type: "n8n-nodes-base.gmail", position: [640, 140], params: "تایید ثبت‌نام" },
      { name: "Wait Until 1 Day Before", type: "n8n-nodes-base.wait", position: [840, 140], params: "زمان‌بندی" },
      { name: "Reminder Email", type: "n8n-nodes-base.gmail", position: [1040, 140], params: "یادآوری ۲۴ ساعته" },
      { name: "Wait Until 1 Hour Before", type: "n8n-nodes-base.wait", position: [1240, 140], params: "زمان‌بندی" },
      { name: "Reminder SMS", type: "n8n-nodes-base.httpRequest", position: [1440, 140], params: "Kavenegar API" },
    ],
    connections: [
      { from: "Registration Webhook", to: "Create Zoom Reg" },
      { from: "Create Zoom Reg", to: "Log to Sheets" },
      { from: "Log to Sheets", to: "Confirm Email" },
      { from: "Confirm Email", to: "Wait Until 1 Day Before" },
      { from: "Wait Until 1 Day Before", to: "Reminder Email" },
      { from: "Reminder Email", to: "Wait Until 1 Hour Before" },
      { from: "Wait Until 1 Hour Before", to: "Reminder SMS" },
    ],
    json: `{
  "name": "Webinar Registration & Reminders",
  "nodes": [
    { "name": "Registration Webhook", "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "register", "httpMethod": "POST" } },
    { "name": "Create Zoom Reg", "type": "n8n-nodes-base.zoom",
      "parameters": { "resource": "meetingRegistrant", "operation": "create" } },
    { "name": "Log to Sheets", "type": "n8n-nodes-base.googleSheets",
      "parameters": { "operation": "append", "sheetId": "webinar-attendees" } },
    { "name": "Confirm Email", "type": "n8n-nodes-base.gmail",
      "parameters": { "subject": "ثبت‌نام شما تایید شد ✅" } },
    { "name": "Wait Until 1 Day Before", "type": "n8n-nodes-base.wait",
      "parameters": { "resume": "specificTime", "dateTime": "={{ $json.eventDate }} -1d" } },
    { "name": "Reminder Email", "type": "n8n-nodes-base.gmail",
      "parameters": { "subject": "فردا وبینار شما برگزار می‌شود" } },
    { "name": "Wait Until 1 Hour Before", "type": "n8n-nodes-base.wait",
      "parameters": { "resume": "specificTime", "dateTime": "={{ $json.eventDate }} -1h" } },
    { "name": "Reminder SMS", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api.kavenegar.com/v1/sms/send.json" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۱۴. تایید هزینه و بازپرداخت کارکنان
  // ═══════════════════════════════════════════
  {
    id: "expense-approval",
    title: "تایید هزینه و بازپرداخت کارکنان",
    description:
      "درخواست‌های هزینه از فرم داخلی ثبت می‌شود. بر اساس مبلغ، مسیر تایید متفاوتی طی می‌شود و پس از تصویب، اطلاعات به سیستم حسابداری و فیش حقوقی ارسال می‌گردد.",
    tags: ["Webhook", "Slack", "Airtable", "QuickBooks"],
    nodes: [
      { name: "Expense Form", type: "n8n-nodes-base.webhook", position: [40, 140], params: "POST /expense" },
      { name: "Log Request", type: "n8n-nodes-base.airtable", position: [240, 140], params: "ثبت درخواست" },
      { name: "Amount Check", type: "n8n-nodes-base.switch", position: [440, 140], params: "زیر / بالای ۵۰۰ دلار" },
      { name: "Manager Approval", type: "n8n-nodes-base.slack", position: [640, 60], params: "تایید مدیر مستقیم" },
      { name: "Finance Approval", type: "n8n-nodes-base.slack", position: [640, 220], params: "تایید مدیر مالی" },
      { name: "Update Status", type: "n8n-nodes-base.airtable", position: [860, 140], params: "به‌روزرسانی وضعیت" },
      { name: "Push to QuickBooks", type: "n8n-nodes-base.quickbooks", position: [1060, 140], params: "ثبت بازپرداخت" },
    ],
    connections: [
      { from: "Expense Form", to: "Log Request" },
      { from: "Log Request", to: "Amount Check" },
      { from: "Amount Check", to: "Manager Approval" },
      { from: "Amount Check", to: "Finance Approval" },
      { from: "Manager Approval", to: "Update Status" },
      { from: "Finance Approval", to: "Update Status" },
      { from: "Update Status", to: "Push to QuickBooks" },
    ],
    json: `{
  "name": "Employee Expense Approval",
  "nodes": [
    { "name": "Expense Form", "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "expense", "httpMethod": "POST" } },
    { "name": "Log Request", "type": "n8n-nodes-base.airtable",
      "parameters": { "operation": "create", "table": "Expenses" } },
    { "name": "Amount Check", "type": "n8n-nodes-base.switch",
      "parameters": { "rules": ["under500", "over500"] } },
    { "name": "Manager Approval", "type": "n8n-nodes-base.slack",
      "parameters": { "blocksUi": "Approve / Reject", "channel": "={{ $json.manager }}" } },
    { "name": "Finance Approval", "type": "n8n-nodes-base.slack",
      "parameters": { "blocksUi": "Approve / Reject", "channel": "#finance" } },
    { "name": "Update Status", "type": "n8n-nodes-base.airtable",
      "parameters": { "operation": "update", "table": "Expenses" } },
    { "name": "Push to QuickBooks", "type": "n8n-nodes-base.quickbooks",
      "parameters": { "resource": "reimbursement", "operation": "create" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۱۵. رزرو نوبت و مدیریت تقویم
  // ═══════════════════════════════════════════
  {
    id: "appointment-booking",
    title: "رزرو نوبت هوشمند با تقویم",
    description:
      "مشتری از طریق چت‌بات تلگرام یا فرم سایت درخواست نوبت می‌دهد، AI زمان‌های خالی تقویم را بررسی و بهترین گزینه را پیشنهاد می‌کند. پس از تایید، رویداد ساخته و یادآوری ارسال می‌شود.",
    tags: ["Telegram", "Google Calendar", "OpenAI", "SMS"],
    nodes: [
      { name: "Telegram Trigger", type: "n8n-nodes-base.telegramTrigger", position: [40, 140], params: "درخواست نوبت" },
      { name: "Booking Agent", type: "@n8n/n8n-nodes-langchain.agent", position: [240, 140], params: "تشخیص زمان مدنظر" },
      { name: "Check Availability", type: "n8n-nodes-base.googleCalendar", position: [440, 140], params: "جستجوی زمان خالی" },
      { name: "Propose Slots", type: "n8n-nodes-base.telegram", position: [640, 140], params: "پیشنهاد ۳ زمان" },
      { name: "Customer Confirms", type: "n8n-nodes-base.telegramTrigger", position: [840, 140], params: "انتخاب کاربر" },
      { name: "Create Event", type: "n8n-nodes-base.googleCalendar", position: [1040, 140], params: "ثبت نوبت" },
      { name: "Send Reminder SMS", type: "n8n-nodes-base.httpRequest", position: [1240, 140], params: "یک ساعت قبل" },
    ],
    connections: [
      { from: "Telegram Trigger", to: "Booking Agent" },
      { from: "Booking Agent", to: "Check Availability" },
      { from: "Check Availability", to: "Propose Slots" },
      { from: "Propose Slots", to: "Customer Confirms" },
      { from: "Customer Confirms", to: "Create Event" },
      { from: "Create Event", to: "Send Reminder SMS" },
    ],
    json: `{
  "name": "Smart Appointment Booking",
  "nodes": [
    { "name": "Telegram Trigger", "type": "n8n-nodes-base.telegramTrigger",
      "parameters": { "updates": ["message"] } },
    { "name": "Booking Agent", "type": "@n8n/n8n-nodes-langchain.agent",
      "parameters": { "model": "gpt-4o-mini", "systemMessage": "Extract requested date/time and service" } },
    { "name": "Check Availability", "type": "n8n-nodes-base.googleCalendar",
      "parameters": { "operation": "getAll", "timeMin": "={{ $json.rangeStart }}" } },
    { "name": "Propose Slots", "type": "n8n-nodes-base.telegram",
      "parameters": { "text": "={{ $json.availableSlots }}" } },
    { "name": "Customer Confirms", "type": "n8n-nodes-base.telegramTrigger",
      "parameters": { "updates": ["message"] } },
    { "name": "Create Event", "type": "n8n-nodes-base.googleCalendar",
      "parameters": { "operation": "create", "start": "={{ $json.chosenSlot }}" } },
    { "name": "Send Reminder SMS", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "https://api.kavenegar.com/v1/sms/send.json" } }
  ]
}`,
  },

  // ═══════════════════════════════════════════
  // ۱۶. مدیریت خودکار نظرات و تعدیل محتوا
  // ═══════════════════════════════════════════
  {
    id: "content-moderation",
    title: "تعدیل خودکار نظرات و محتوای کاربران",
    description:
      "نظرات جدید کاربران در سایت یا اینستاگرام با AI از نظر توهین، اسپم و محتوای نامناسب بررسی می‌شوند. موارد مشکوک پنهان و برای بازبینی انسانی در Slack ارسال می‌گردند.",
    tags: ["Webhook", "OpenAI", "Slack", "Airtable"],
    nodes: [
      { name: "Comment Webhook", type: "n8n-nodes-base.webhook", position: [40, 140], params: "POST /comment" },
      { name: "AI Moderation Check", type: "n8n-nodes-base.openAi", position: [240, 140], params: "Moderation API" },
      { name: "Is Flagged?", type: "n8n-nodes-base.if", position: [440, 140], params: "محتوای نامناسب" },
      { name: "Hide Comment", type: "n8n-nodes-base.httpRequest", position: [640, 40], params: "مخفی کردن نظر" },
      { name: "Log for Review", type: "n8n-nodes-base.airtable", position: [840, 40], params: "ثبت جهت بازبینی" },
      { name: "Alert Moderator", type: "n8n-nodes-base.slack", position: [1040, 40], params: "#moderation" },
      { name: "Publish Comment", type: "n8n-nodes-base.httpRequest", position: [640, 240], params: "انتشار نظر" },
    ],
    connections: [
      { from: "Comment Webhook", to: "AI Moderation Check" },
      { from: "AI Moderation Check", to: "Is Flagged?" },
      { from: "Is Flagged?", to: "Hide Comment" },
      { from: "Hide Comment", to: "Log for Review" },
      { from: "Log for Review", to: "Alert Moderator" },
      { from: "Is Flagged?", to: "Publish Comment" },
    ],
    json: `{
  "name": "Automated Content Moderation",
  "nodes": [
    { "name": "Comment Webhook", "type": "n8n-nodes-base.webhook",
      "parameters": { "path": "comment", "httpMethod": "POST" } },
    { "name": "AI Moderation Check", "type": "n8n-nodes-base.openAi",
      "parameters": { "resource": "moderation", "operation": "classify" } },
    { "name": "Is Flagged?", "type": "n8n-nodes-base.if",
      "parameters": { "conditions": { "boolean": [{ "value1": "={{ $json.flagged }}", "value2": true }] } } },
    { "name": "Hide Comment", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "method": "PATCH", "url": "/api/comments/{{ $json.id }}/hide" } },
    { "name": "Log for Review", "type": "n8n-nodes-base.airtable",
      "parameters": { "operation": "create", "table": "Flagged Comments" } },
    { "name": "Alert Moderator", "type": "n8n-nodes-base.slack",
      "parameters": { "channel": "#moderation" } },
    { "name": "Publish Comment", "type": "n8n-nodes-base.httpRequest",
      "parameters": { "method": "PATCH", "url": "/api/comments/{{ $json.id }}/publish" } }
  ]
}`,
  },

];