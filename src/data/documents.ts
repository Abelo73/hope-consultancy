export type FieldType = "text" | "textarea" | "select" | "date" | "table";

export interface FormField {
  id: string;
  labelAm: string;
  labelEn: string;
  type: FieldType;
  options?: { am: string; en: string }[];
  rows?: number;
}

export interface DocumentDef {
  id: string;
  titleAm: string;
  titleEn: string;
  descAm: string;
  descEn: string;
  fileName: string;
  fileType: "DOCX" | "XLSX";
  fillable: boolean;
  icon: "clipboard" | "scale" | "flag" | "grid";
  fields?: FormField[];
  previewRowsAm?: string[][];
}

export const documents: DocumentDef[] = [
  {
    id: "position-detail",
    titleAm: "የሥራ መደቦች ዝርዝር መረጃ ቅጽ",
    titleEn: "Job Position Detail Form",
    descAm: "የሥራ ሂደት፣ የመደብ መጠሪያ፣ ደረጃና ተፈላጊ ችሎታን (የትምህርት ዝግጅትና ሥራ ልምድ) የሚያደራጅ ቅጽ።",
    descEn: "Organizes job process name, position title, grade, and required qualifications (education and experience).",
    fileName: "position-detail-form.docx",
    fileType: "DOCX",
    fillable: true,
    icon: "clipboard",
    fields: [
      { id: "processName", labelAm: "የሥራ ሂደት ስም", labelEn: "Job process name", type: "text" },
      { id: "positionTitle", labelAm: "የመደብ መጠሪያ", labelEn: "Position title", type: "text" },
      { id: "positionNo", labelAm: "የመ/መ/ቁ", labelEn: "Position reference no.", type: "text" },
      { id: "grade", labelAm: "ደረጃ", labelEn: "Grade", type: "text" },
      { id: "eduType", labelAm: "የትምህርት አይነት", labelEn: "Field of education", type: "text" },
      { id: "eduLevel", labelAm: "የትምህርት ዝግጅት", labelEn: "Education level", type: "select", options: [
        { am: "ፕ.ኤች.ዲ", en: "PhD" },
        { am: "ማስተርስ", en: "Master's" },
        { am: "መ/ድግሪ", en: "Bachelor's" },
        { am: "ዲፕሎማ", en: "Diploma" },
        { am: "ሰርቲፊከት", en: "Certificate" },
      ]},
      { id: "experience", labelAm: "ሥራ ልምድ", labelEn: "Work experience", type: "text" },
      { id: "remark", labelAm: "ምርመራ", labelEn: "Remarks", type: "textarea", rows: 2 },
      { id: "coordinatorName", labelAm: "ያዘጋጀው የሥራ ሂደት አስተባባሪ - ስም", labelEn: "Prepared by (Coordinator) - Name", type: "text" },
      { id: "hrName", labelAm: "ያረጋገጠው የሰው ሀብት አስተዳደር - ስም", labelEn: "Verified by (HR Admin) - Name", type: "text" },
      { id: "date", labelAm: "ቀን", labelEn: "Date", type: "date" },
    ],
  },
  {
    id: "competition-application",
    titleAm: "የሠራተኞች ድልድል መወዳደሪያ ማመልከቻ ቅጽ",
    titleEn: "Staff Placement Competition Application",
    descAm: "ሠራተኛው የትምህርት ደረጃ፣ የማህደር ጥራት፣ የሥራ አፈጻጸምና የአመራር ብቃት መረጃውን አስገብቶ ለሚፈልገው ሥራ መደብ በቅድመ-ተከተል የሚያመለክትበት ቅጽ።",
    descEn: "Lets an employee submit education, file quality, performance, and leadership-competency details and rank their preferred positions for the competition.",
    fileName: "competition-application-form.docx",
    fileType: "DOCX",
    fillable: true,
    icon: "scale",
    fields: [
      { id: "fullName", labelAm: "የሠራተኛ ሙሉ ስም", labelEn: "Employee full name", type: "text" },
      { id: "processName", labelAm: "የሚሠራበት የሥራ ሂደት ስም", labelEn: "Current job process", type: "text" },
      { id: "positionTitle", labelAm: "የመደብ መጠሪያ", labelEn: "Current position title", type: "text" },
      { id: "grade", labelAm: "የመደቡ ደረጃ", labelEn: "Current grade", type: "text" },
      { id: "fileQuality", labelAm: "የማህደር ጥራት", labelEn: "File quality score", type: "text" },
      { id: "eduLevel", labelAm: "የትምህርት ደረጃ", labelEn: "Education level", type: "select", options: [
        { am: "ፕ.ኤች.ዲ", en: "PhD" },
        { am: "ማስተርስ", en: "Master's" },
        { am: "መ/ድግሪ", en: "Bachelor's" },
        { am: "ዲፕሎማ", en: "Diploma" },
        { am: "ሰርቲፊከት", en: "Certificate" },
        { am: "ቀለም", en: "Literacy level" },
      ]},
      { id: "ethioCoders", labelAm: "የኢትዮኮደርስ ሰርተፊከት", labelEn: "EthioCoders certificate level", type: "select", options: [
        { am: "1", en: "Level 1" }, { am: "2", en: "Level 2" }, { am: "3", en: "Level 3" }, { am: "4", en: "Level 4" }, { am: "የለም", en: "None" },
      ]},
      { id: "performanceAvg", labelAm: "የሥራ አፈጻጸም አማካይ", labelEn: "Average performance score", type: "text" },
      { id: "leadershipScore", labelAm: "የአመራር ብቃት", labelEn: "Leadership competency score", type: "text" },
      { id: "choice1", labelAm: "1ኛ ምርጫ - የመደቡ መጠሪያ", labelEn: "1st choice - position title", type: "text" },
      { id: "choice2", labelAm: "2ኛ ምርጫ - የመደቡ መጠሪያ", labelEn: "2nd choice - position title", type: "text" },
      { id: "choice3", labelAm: "3ኛ ምርጫ - የመደቡ መጠሪያ", labelEn: "3rd choice - position title", type: "text" },
      { id: "date", labelAm: "ቀን", labelEn: "Date", type: "date" },
    ],
  },
  {
    id: "grievance-form",
    titleAm: "ቅሬታ ቅጽ",
    titleEn: "Grievance Form",
    descAm: "በድልድል ኮሚቴ አሠራር ሂደት ላይ ቅሬታ ያለው ሠራተኛ ምክንያቱንና የሚፈልገውን የዳኝነት ውሳኔ የሚያቀርብበት ቅጽ።",
    descEn: "Lets an employee with a concern about the placement committee's process state their reason and the resolution they're requesting.",
    fileName: "grievance-form.docx",
    fileType: "DOCX",
    fillable: true,
    icon: "flag",
    fields: [
      { id: "orgName", labelAm: "የመስሪያ ቤት ስም", labelEn: "Office / organization name", type: "text" },
      { id: "complainantName", labelAm: "የቅሬታ አቅራቢ ባለሙያ ስም", labelEn: "Complainant's name", type: "text" },
      { id: "processName", labelAm: "የሥራ ሂደት ስም", labelEn: "Job process name", type: "text" },
      { id: "positionTitle", labelAm: "የመደብ መጠሪያ", labelEn: "Position title", type: "text" },
      { id: "positionNo", labelAm: "የመ/መ/ቁ", labelEn: "Position reference no.", type: "text" },
      { id: "grade", labelAm: "ደረጃ", labelEn: "Grade", type: "text" },
      { id: "mainReason", labelAm: "የቅሬታ ዋና ምክንያት", labelEn: "Main reason for grievance", type: "textarea", rows: 4 },
      { id: "requestedRuling", labelAm: "የሚፈልገው የዳኝነት ውሳኔ", labelEn: "Requested ruling / resolution", type: "textarea", rows: 4 },
      { id: "signatureName", labelAm: "ስም", labelEn: "Name", type: "text" },
      { id: "date", labelAm: "ቀን", labelEn: "Date", type: "date" },
    ],
  },
  {
    id: "evaluation-workbook",
    titleAm: "የተለያዩ ቅጾች (ምዝገባ፣ ድርጊት መርሃ-ግብርና ውጤት ማጠቃለያ)",
    titleEn: "Evaluation Workbook (Registration, Action Plan & Result Summaries)",
    descAm: "የተወዳዳሪዎች ምዝገባ ቅጽ፣ የድርጊት መርሃ-ግብር (ከኮሚቴ ምስረታ እስከ ውጤት ማሳወቅ)፣ እና ለቡድን መሪና ለፈጻሚ ሥራ መደቦች የተለያየ ሚዛን ያላቸውን ውጤት ማጠቃለያ ሉሆችን የያዘ የሥራ ደብተር።",
    descEn: "A workbook containing the candidate registration sheet, the action plan (from committee formation to announcing results), and weighted result-summary sheets for team-lead and execution-level positions.",
    fileName: "evaluation-workbook.xlsx",
    fileType: "XLSX",
    fillable: false,
    icon: "grid",
    previewRowsAm: [
      ["ተ/ቁ", "ዝርዝር ተግባራት", "የሚፈጸምበት ቀን", "ፈጻሚ"],
      ["1", "ድርግት መረሃ-ግብር ማዘጋጀት", "14/07", "ኮሚቴ"],
      ["2", "በየሥራ ሂደት ተፈላጊ ችሎታን መለየት", "14/07", "ኮሚቴ"],
      ["3", "በቅጽ አሞላል ዙሪያ ለሠራተኞች ግንዛቤ ማስጨበት", "15/07", "ኮሚቴ"],
      ["4", "ማስታወቂያ ማውጣት", "16-18/07", "ኮሚቴ"],
      ["5", "የውድድር ማመልከቻ ማቅረብ", "16-18/07", "ሠራተኞች"],
      ["6", "ፋይል ማደራጀትና መመርመር", "16-21/07", "ኮሚቴ"],
      ["7", "በኃላፊ የሚሰጥ ውጤት መቀበል", "22-23/07", "ኃላፊ"],
      ["8", "ውድድር ማካሄድ", "22-23/07", "ኮሚቴ"],
      ["9", "በኃላፊ ማጽደቅ", "24/07", "ኃላፊ"],
      ["10", "ውጤቱን መለጠፍ", "25/07", "ኮሚቴ"],
      ["11", "ለሠራተኞች ደብዳቤ መስጠት", "28/07", "የሰው ሀብት አስተዳደር"],
    ],
  },
];

export interface ProcessStep {
  numAm: string;
  numEn: string;
  taskAm: string;
  taskEn: string;
  ownerAm: string;
  ownerEn: string;
  dayAm: string;
}

export const processSteps: ProcessStep[] = [
  { numAm: "፩", numEn: "1", taskAm: "የድርግት መረሃ-ግብር ማዘጋጀት", taskEn: "Prepare the action plan", ownerAm: "ኮሚቴ", ownerEn: "Committee", dayAm: "ቀን 1" },
  { numAm: "፪", numEn: "2", taskAm: "በየሥራ ሂደት ተፈላጊ ችሎታን መለየት", taskEn: "Identify required qualifications per job process", ownerAm: "ኮሚቴ", ownerEn: "Committee", dayAm: "ቀን 1" },
  { numAm: "፫", numEn: "3", taskAm: "በቅጽ አሞላል ዙሪያ ለሠራተኞች ግንዛቤ ማስጨበት", taskEn: "Brief employees on completing the forms", ownerAm: "ኮሚቴ", ownerEn: "Committee", dayAm: "ቀን 2" },
  { numAm: "፬", numEn: "4", taskAm: "ማስታወቂያ ማውጣት", taskEn: "Publish the announcement", ownerAm: "ኮሚቴ", ownerEn: "Committee", dayAm: "ቀን 3-5" },
  { numAm: "፭", numEn: "5", taskAm: "የውድድር ማመልከቻ ማቅረብ", taskEn: "Submit competition applications", ownerAm: "ሠራተኞች", ownerEn: "Employees", dayAm: "ቀን 3-5" },
  { numAm: "፮", numEn: "6", taskAm: "ፋይል ማደራጀትና መመርመር", taskEn: "Organize and review files", ownerAm: "ኮሚቴ", ownerEn: "Committee", dayAm: "ቀን 3-8" },
  { numAm: "፯", numEn: "7", taskAm: "በኃላፊ የሚሰጥ ውጤት መቀበል", taskEn: "Receive scores from the supervisor", ownerAm: "ኃላፊ", ownerEn: "Supervisor", dayAm: "ቀን 9-10" },
  { numAm: "፰", numEn: "8", taskAm: "ውድድር ማካሄድ", taskEn: "Conduct the competition", ownerAm: "ኮሚቴ", ownerEn: "Committee", dayAm: "ቀን 9-10" },
  { numAm: "፱", numEn: "9", taskAm: "በኃላፊ ማጽደቅ", taskEn: "Approval by the supervisor", ownerAm: "ኃላፊ", ownerEn: "Supervisor", dayAm: "ቀን 11" },
  { numAm: "፲", numEn: "10", taskAm: "ውጤቱን መለጠፍ", taskEn: "Post the results", ownerAm: "ኮሚቴ", ownerEn: "Committee", dayAm: "ቀን 12" },
  { numAm: "፲፩", numEn: "11", taskAm: "ለሠራተኞች ደብዳቤ መስጠት", taskEn: "Issue letters to employees", ownerAm: "የሰው ሀብት አስተዳደር", ownerEn: "HR Administration", dayAm: "ቀን 15" },
];
