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
];