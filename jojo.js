let currentRole = 'student';
let currentTab = 'timetable';
let selectedYear = '1';
let selectedDay = 'الثلاثاء';
let searchQuery = '';

let libTab = 'shared'; // 'shared' | 'specialized'
let sharedDeptGroup = 'cs'; // 'cs' | 'math'
let specDeptGroup = 'cs';   // 'cs' | 'math'
let selectedSem = 'sem1';   // 'sem1' | 'sem2'
let selectedScheduleSpec = 'cs'; // 'cs' | 'it' | 'networks' | 'math' | 'stat'

const activeDays = ['الثلاثاء', 'الأربعاء', 'الخميس'];

// 7 مواد لكل سمستر في السنة الأولى (أكواد 2526)
const year1Semesters = {
    sem1: [
        { code: 'CS2526-101', name: 'مقدمة في علوم الحاسوب والبرمجة', doctor: 'د. داليا طه إبراهيم', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'القاعة الكبرى' },
        { code: 'MATH2526-102', name: 'الرياضيات المتقطعة (Discrete Math)', doctor: 'د. عاصم أحمد', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج الرياضيات' },
        { code: 'CS2526-103', name: 'البرمجة المهيكلة بلغة C++', doctor: 'د. خالد عبد الرحيم', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الحاسوب (1)' },
        { code: 'MATH2526-104', name: 'التفاضل والتكامل (1)', doctor: 'بروف. الكندي يوسف', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج الرياضيات' },
        { code: 'PHYS2526-105', name: 'الفيزياء العامة للتقنية والحاسوب', doctor: 'د. سمية البشير', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'قاعة الفيزياء' },
        { code: 'ENG2526-106', name: 'مهارات الاتصال واللغة الإنجليزية', doctor: 'أ. نوال التوم', day: 'الخميس', time: '10:15 ص - 11:45 ص', hall: 'قاعة اللغات' },
        { code: 'ISL2526-107', name: 'الدراسات الإسلامية والقرآن الكريم', doctor: 'د. الشيخ عبد الله', day: 'الخميس', time: '12:00 ظ - 01:30 م', hall: 'القاعة الكبرى' }
    ],
    sem2: [
        { code: 'CS2526-121', name: 'أساسيات البرمجة المتقدمة (C++)', doctor: 'د. خالد عبد الرحيم', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الحاسوب (1)' },
        { code: 'MATH2526-122', name: 'التفاضل والتكامل (2)', doctor: 'بروف. الكندي يوسف', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج الرياضيات' },
        { code: 'CS2526-123', name: 'تصميم المنطق الرقمي (Digital Logic)', doctor: 'د. هيثم علي', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الهاردوير' },
        { code: 'STAT2526-124', name: 'مقدمة في الإحصاء الاحتمالي', doctor: 'د. الفاتح الأمين', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة الإحصاء' },
        { code: 'CS2526-125', name: 'مهارات الحوسبة ومكونات النظام', doctor: 'د. طارق زياد', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'القاعة الكبرى' },
        { code: 'ENG2526-126', name: 'اللغة الإنجليزية الأكاديمية (2)', doctor: 'أ. نوال التوم', day: 'الخميس', time: '10:15 ص - 11:45 ص', hall: 'قاعة اللغات' },
        { code: 'SUD2526-127', name: 'الدراسات السودانية والبيئة', doctor: 'د. الشيخ عبد الله', day: 'الخميس', time: '12:00 ظ - 01:30 م', hall: 'القاعة الكبرى' }
    ]
};

// 7 مواد لكل سمستر في السنة الثانية (أكواد 2324)
const year2Semesters = {
    sem1: [
        { code: 'CS2324-201', name: 'هياكل البيانات والخوارزميات (1)', doctor: 'د. طارق زياد', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الحاسوب (2)' },
        { code: 'CS2324-202', name: 'البرمجة كائنية التوجه OOP (Java)', doctor: 'د. رانيا عثمان', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل البرمجيات' },
        { code: 'MATH2324-203', name: 'الجبر الخطى وتحليل المصفوفات', doctor: 'بروف. الكندي يوسف', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج الرياضيات' },
        { code: 'CS2324-204', name: 'نظم المنطق الرقمي والدوائر', doctor: 'د. هيثم علي', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل الهاردوير' },
        { code: 'STAT2324-205', name: 'الإحتمالات والاحصاء الرياضي', doctor: 'د. الفاتح الأمين', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'قاعة الإحصاء' },
        { code: 'DB2324-206', name: 'قواعد البيانات (1) - مفاهيم ونمذجة', doctor: 'د. أمجد مصطفى', day: 'الخميس', time: '10:15 ص - 12:15 ظ', hall: 'معمل قواعد البيانات' },
        { code: 'ENG2324-207', name: 'اللغة الإنجليزية التخصصية التقنية', doctor: 'أ. نوال التوم', day: 'الخميس', time: '12:30 ظ - 02:00 ظ', hall: 'قاعة اللغات' }
    ],
    sem2: [
        { code: 'CS2324-221', name: 'هياكل البيانات والخوارزميات (2)', doctor: 'د. طارق زياد', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الحاسوب (2)' },
        { code: 'CS2324-222', name: 'البرمجة المرئية وتطوير الواجهات', doctor: 'د. رانيا عثمان', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل البرمجيات' },
        { code: 'MATH2324-223', name: 'المعادلات التفاضلية العادية', doctor: 'بروف. الكندي يوسف', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج الرياضيات' },
        { code: 'CS2324-224', name: 'عمارة وتنظيم الحاسوب (Architecture)', doctor: 'د. هيثم علي', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج 2' },
        { code: 'STAT2324-225', name: 'التحليل الإحصائي والحزم البرمجية', doctor: 'د. الفاتح الأمين', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'معمل الإحصاء' },
        { code: 'DB2324-226', name: 'قواعد البيانات (2) - SQL وتطبيقات', doctor: 'د. أمجد مصطفى', day: 'الخميس', time: '10:15 ص - 12:15 ظ', hall: 'معمل قواعد البيانات' },
        { code: 'SE2324-227', name: 'مقدمة في هندسة البرمجيات', doctor: 'د. داليا طه إبراهيم', day: 'الخميس', time: '12:30 ظ - 02:00 ظ', hall: 'قاعة 3' }
    ]
};

// المواد المشتركة للسنة الثالثة (أكواد 2122) والسنة الرابعة (أكواد 1920)
const sharedSubjectsConfig = {
    '3': {
        cs: [
            { code: 'CS2122-301', name: 'نظم التشغيل (Operating Systems)', doctor: 'د. خالد عبد الرحيم', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج 1' },
            { code: 'NET2122-302', name: 'شبكات الحاسوب المتقدمة (1)', doctor: 'د. أمجد مصطفى', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج 1' },
            { code: 'SE2122-303', name: 'الهندسة البرمجية المتقدمة', doctor: 'د. داليا طه إبراهيم', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 4' },
            { code: 'CS2122-304', name: 'تحليل وتصميم الخوارزميات', doctor: 'بروف. الكندي يوسف', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة 4' },
            { code: 'DB2122-305', name: 'نظم إدارة قواعد البيانات (2)', doctor: 'د. الفاتح الأمين', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'معمل قواعد البيانات' }
        ],
        math: [
            { code: 'MATH2122-301', name: 'الجبر المجرد المتقدم', doctor: 'د. عاصم أحمد', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج الرياضيات' },
            { code: 'MATH2122-302', name: 'التحليل الحقيقي (1)', doctor: 'بروف. الكندي يوسف', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج الرياضيات' },
            { code: 'MATH2122-303', name: 'المعادلات التفاضلية الجزئية', doctor: 'د. سمية البشير', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 2' },
            { code: 'STAT2122-304', name: 'الإحصاء الرياضي ونظرية التوزيعات', doctor: 'د. الفاتح الأمين', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل الإحصاء' },
            { code: 'STAT2122-305', name: 'النماذج الخطية وتحليل الانحدار', doctor: 'د. رانيا عثمان', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'قاعة الإحصاء' }
        ]
    },
    '4': {
        cs: [
            { code: 'CS1920-401', name: 'منهجية البحث العلمي والأكاديمي', doctor: 'د. داليا طه إبراهيم', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 1' },
            { code: 'CS1920-402', name: 'أخلاقيات وقوانين الحاسوب', doctor: 'د. الشيخ عبد الله', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة 1' },
            { code: 'CS1920-403', name: 'التنافسية وريادة الأعمال الرقمية', doctor: 'د. أمجد مصطفى', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 1' },
            { code: 'SE1920-404', name: 'جودة واختبار البرمجيات', doctor: 'د. طارق زياد', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل البرمجيات' },
            { code: 'NET1920-405', name: 'بروتوكولات الاتصال المتقدمة', doctor: 'د. هيثم علي', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'معمل الشبكات' }
        ],
        math: [
            { code: 'MATH1920-401', name: 'التحليل العددي المتقدم', doctor: 'بروف. الكندي يوسف', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج الرياضيات' },
            { code: 'MATH1920-402', name: 'نظرية الأعداد وتطبيقات التشفير', doctor: 'د. عاصم أحمد', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج الرياضيات' },
            { code: 'MATH1920-403', name: 'الجبر الخطى المتقدم والمصفوفات', doctor: 'د. سمية البشير', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 2' },
            { code: 'STAT1920-404', name: 'الاستدلال الإحصائي المتقدم', doctor: 'د. الفاتح الأمين', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل الإحصاء' },
            { code: 'STAT1920-405', name: 'نظرية العينات ومسح البيانات', doctor: 'د. رانيا عثمان', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'قاعة الإحصاء' }
        ]
    }
};

// جداول المحاضرات التخصصية للسنة 3 و 4 و 5 لكل تخصص براه
const timetableSpecSchedules = {
    '3': {
        cs: [
            { code: 'CS2122-301', name: 'نظم التشغيل (Operating Systems)', doctor: 'د. خالد عبد الرحيم', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج 1', spec: 'cs' },
            { code: 'CS2122-311', name: 'الذكاء الاصطناعي والشبكات العصبية', doctor: 'د. طارق زياد', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل الذكاء الاصطناعي', spec: 'cs' },
            { code: 'SE2122-303', name: 'الهندسة البرمجية المتقدمة', doctor: 'د. داليا طه إبراهيم', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 4', spec: 'cs' },
            { code: 'CS2122-304', name: 'تحليل وتصميم الخوارزميات', doctor: 'بروف. الكندي يوسف', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة 4', spec: 'cs' },
            { code: 'CS2122-312', name: 'برمجة المترجمات (Compilers)', doctor: 'د. خالد عبد الرحيم', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'معمل الحاسوب (1)', spec: 'cs' }
        ],
        it: [
            { code: 'CS2122-301', name: 'نظم التشغيل (Operating Systems)', doctor: 'د. خالد عبد الرحيم', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج 1', spec: 'it' },
            { code: 'IT2122-311', name: 'تطوير تطبيقات الويب والسحابية', doctor: 'د. رانيا عثمان', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل الويب', spec: 'it' },
            { code: 'SE2122-303', name: 'الهندسة البرمجية المتقدمة', doctor: 'د. داليا طه إبراهيم', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 4', spec: 'it' },
            { code: 'IT2122-312', name: 'إدارة نظم وتكنولوجيا المعلومات', doctor: 'د. أمجد مصطفى', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة 3 IT', spec: 'it' },
            { code: 'DB2122-305', name: 'نظم إدارة قواعد البيانات (2)', doctor: 'د. الفاتح الأمين', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'معمل قواعد البيانات', spec: 'it' }
        ],
        networks: [
            { code: 'NET2122-302', name: 'شبكات الحاسوب المتقدمة (1)', doctor: 'د. أمجد مصطفى', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج 1', spec: 'networks' },
            { code: 'NET2122-311', name: 'أمن وشبكات البيانات المتقدمة', doctor: 'د. هيثم علي', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل الشبكات (1)', spec: 'networks' },
            { code: 'NET2122-312', name: 'إدارة سيرفرات والتوجيه Routing', doctor: 'د. هيثم علي', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'معمل السيرفرات', spec: 'networks' },
            { code: 'CS2122-304', name: 'تحليل وتصميم الخوارزميات', doctor: 'بروف. الكندي يوسف', day: 'الأربعاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة 4', spec: 'networks' },
            { code: 'DB2122-305', name: 'نظم إدارة قواعد البيانات (2)', doctor: 'د. الفاتح الأمين', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'معمل قواعد البيانات', spec: 'networks' }
        ],
        math: [
            { code: 'MATH2122-301', name: 'الجبر المجرد المتقدم', doctor: 'د. عاصم أحمد', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج الرياضيات', spec: 'math' },
            { code: 'MATH2122-311', name: 'التحليل الحقيقي والجبر المجرد', doctor: 'بروف. الكندي يوسف', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج الرياضيات', spec: 'math' },
            { code: 'MATH2122-303', name: 'المعادلات التفاضلية الجزئية', doctor: 'د. سمية البشير', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 2 رياضيات', spec: 'math' },
            { code: 'MATH2122-312', name: 'البرمجة الخطية وبحوث العمليات', doctor: 'د. عاصم أحمد', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'مدرج الرياضيات', spec: 'math' }
        ],
        stat: [
            { code: 'STAT2122-304', name: 'الإحصاء الرياضي ونظرية التوزيعات', doctor: 'د. الفاتح الأمين', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الإحصاء', spec: 'stat' },
            { code: 'STAT2122-311', name: 'الإحصاء الرياضي ونظرية التقدير', doctor: 'د. رانيا عثمان', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة الإحصاء', spec: 'stat' },
            { code: 'STAT2122-305', name: 'النماذج الخطية وتحليل الانحدار', doctor: 'د. الفاتح الأمين', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة الإحصاء', spec: 'stat' },
            { code: 'STAT2122-312', name: 'تحليل السلاسل الزمنية والتنبؤ', doctor: 'د. رانيا عثمان', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'معمل الإحصاء', spec: 'stat' }
        ]
    },
    '4': {
        cs: [
            { code: 'CS1920-401', name: 'منهجية البحث العلمي والأكاديمي', doctor: 'د. داليا طه إبراهيم', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 1', spec: 'cs' },
            { code: 'CS1920-411', name: 'الرؤية بالحاسوب ومعالجة الصور', doctor: 'د. طارق زياد', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل الرؤية', spec: 'cs' },
            { code: 'SE1920-404', name: 'جودة واختبار البرمجيات', doctor: 'د. طارق زياد', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'معمل البرمجيات', spec: 'cs' },
            { code: 'CS1920-412', name: 'الحوسبة التوزيعية والنظم المتوازية', doctor: 'د. خالد عبد الرحيم', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'قاعة 1', spec: 'cs' }
        ],
        it: [
            { code: 'CS1920-401', name: 'منهجية البحث العلمي والأكاديمي', doctor: 'د. داليا طه إبراهيم', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 1', spec: 'it' },
            { code: 'IT1920-411', name: 'إدارة مشاريع التكنولوجيا وحوكمة IT', doctor: 'د. أمجد مصطفى', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة IT', spec: 'it' },
            { code: 'IT1920-412', name: 'تطوير تطبيقات الهاتف الذكي المتقدمة', doctor: 'د. رانيا عثمان', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الهاتف', spec: 'it' },
            { code: 'CS1920-403', name: 'التنافسية وريادة الأعمال الرقمية', doctor: 'د. أمجد مصطفى', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'قاعة 1', spec: 'it' }
        ],
        networks: [
            { code: 'NET1920-405', name: 'بروتوكولات الاتصال المتقدمة', doctor: 'د. هيثم علي', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الشبكات', spec: 'networks' },
            { code: 'NET1920-411', name: 'الشبكات اللاسلكية وانترنت الأشياء', doctor: 'د. هيثم علي', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'معمل IoT', spec: 'networks' },
            { code: 'NET1920-412', name: 'الأمن السيبراني والتحقيق الرقمي', doctor: 'د. أمجد مصطفى', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الأمن', spec: 'networks' },
            { code: 'CS1920-402', name: 'أخلاقيات وقوانين الحاسوب', doctor: 'د. الشيخ عبد الله', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'قاعة 1', spec: 'networks' }
        ],
        math: [
            { code: 'MATH1920-401', name: 'التحليل العددي المتقدم', doctor: 'بروف. الكندي يوسف', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'مدرج الرياضيات', spec: 'math' },
            { code: 'MATH1920-411', name: 'التحليل العددي المتقدم وتطبيقاته', doctor: 'بروف. الكندي يوسف', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'مدرج الرياضيات', spec: 'math' },
            { code: 'MATH1920-403', name: 'الجبر الخطى المتقدم والمصفوفات', doctor: 'د. سمية البشير', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة 2', spec: 'math' },
            { code: 'MATH1920-412', name: 'نظرية الأعداد والتشفير الرياضي', doctor: 'د. عاصم أحمد', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'مدرج الرياضيات', spec: 'math' }
        ],
        stat: [
            { code: 'STAT1920-404', name: 'الاستدلال الإحصائي المتقدم', doctor: 'د. الفاتح الأمين', day: 'الثلاثاء', time: '08:00 ص - 10:00 ص', hall: 'معمل الإحصاء', spec: 'stat' },
            { code: 'STAT1920-411', name: 'الاستدلال الإحصائي وتحليل السلاسل الزمنية', doctor: 'د. رانيا عثمان', day: 'الثلاثاء', time: '10:15 ص - 12:15 ظ', hall: 'قاعة الإحصاء', spec: 'stat' },
            { code: 'STAT1920-405', name: 'نظرية العينات ومسح البيانات', doctor: 'د. رانيا عثمان', day: 'الأربعاء', time: '08:00 ص - 10:00 ص', hall: 'قاعة الإحصاء', spec: 'stat' },
            { code: 'STAT1920-412', name: 'بحوث العمليات ونماذج المخاطر', doctor: 'د. الفاتح الأمين', day: 'الخميس', time: '08:00 ص - 10:00 ص', hall: 'معمل الإحصاء', spec: 'stat' }
        ]
    },
    '5': {
        cs: [{ code: 'CS0018-501', name: 'مشروع التخرج والبحث التطبيقي (علوم الحاسوب)', doctor: 'لجنة الإشراف - قسم علوم الحاسوب', day: 'الثلاثاء', time: '09:00 ص - 01:00 م', hall: 'معمل الأبحاث CS' }],
        it: [{ code: 'IT0018-501', name: 'مشروع التخرج وحوكمة النظم (تقنية المعلومات)', doctor: 'لجنة الإشراف - قسم تقنية المعلومات', day: 'الثلاثاء', time: '09:00 ص - 01:00 م', hall: 'معمل الأبحاث IT' }],
        networks: [{ code: 'NET0018-501', name: 'مشروع التخرج وبناء الشبكات (الشبكات)', doctor: 'لجنة الإشراف - قسم الشبكات', day: 'الأربعاء', time: '09:00 ص - 01:00 م', hall: 'معمل الأبحاث NET' }],
        math: [{ code: 'MATH0018-501', name: 'مشروع التخرج في الرياضيات البحتة والتطبيقية', doctor: 'لجنة الإشراف - قسم الرياضيات', day: 'الأربعاء', time: '09:00 ص - 01:00 م', hall: 'مدرج الرياضيات' }],
        stat: [{ code: 'STAT0018-501', name: 'مشروع التخرج والإحصاء التطبيقي وتحليل البيانات', doctor: 'لجنة الإشراف - قسم الإحصاء', day: 'الخميس', time: '09:00 ص - 01:00 م', hall: 'معمل الإحصاء' }]
    }
};

// المواد التخصصية للسنة الثالثة (2122) والسنة الرابعة (1920)
const specializedConfig = {
    '3': {
        cs: { title: 'تخصص علوم الحاسوب (CS)', subjects: [{ code: 'CS2122-311', name: 'الذكاء الاصطناعي والشبكات العصبية' }, { code: 'CS2122-312', name: 'برمجة المترجمات' }] },
        it: { title: 'تخصص تقنية المعلومات (IT)', subjects: [{ code: 'IT2122-311', name: 'تطوير تطبيقات الويب والسحابية' }, { code: 'IT2122-312', name: 'إدارة نظم وتكنولوجيا المعلومات' }] },
        networks: { title: 'تخصص شبكات الحاسوب (Networks)', subjects: [{ code: 'NET2122-311', name: 'أمن وشبكات البيانات المتقدمة' }, { code: 'NET2122-312', name: 'إدارة سيرفرات والتوجيه' }] },
        math: { title: 'تخصص الرياضيات (Mathematics)', subjects: [{ code: 'MATH2122-311', name: 'التحليل الحقيقي والجبر المجرد' }, { code: 'MATH2122-312', name: 'المعادلات التفاضلية الجزئية' }] },
        stat: { title: 'تخصص الإحصاء (Statistics)', subjects: [{ code: 'STAT2122-311', name: 'الإحصاء الرياضي ونظرية التتقدير' }, { code: 'STAT2122-312', name: 'النماذج الخطية وتحليل البيانات' }] }
    },
    '4': {
        cs: { title: 'تخصص علوم الحاسوب (CS)', subjects: [{ code: 'CS1920-411', name: 'الرؤية بالحاسوب ومعالجة الصور' }, { code: 'CS1920-412', name: 'الحوسبة التوزيعية والنظم المتوازية' }] },
        it: { title: 'تخصص تقنية المعلومات (IT)', subjects: [{ code: 'IT1920-411', name: 'إدارة مشاريع التكنولوجيا وحوكمة IT' }, { code: 'IT1920-412', name: 'تطوير تطبيقات الهاتف الذكي المتقدمة' }] },
        networks: { title: 'تخصص الشبكات (Networks)', subjects: [{ code: 'NET1920-411', name: 'الشبكات اللاسلكية وانترنت الأشياء' }, { code: 'NET1920-412', name: 'الأمن السيبراني والتحقيق الرقمي' }] },
        math: { title: 'تخصص الرياضيات (Mathematics)', subjects: [{ code: 'MATH1920-411', name: 'التحليل العددي المتقدم' }, { code: 'MATH1920-412', name: 'نظرية الأعداد وتطبيقات التشفير' }] },
        stat: { title: 'تخصص الإحصاء (Statistics)', subjects: [{ code: 'STAT1920-411', name: 'الاستدلال الإحصائي وتحليل السلاسل الزمنية' }, { code: 'STAT1920-412', name: 'بحوث العمليات ونماذج المخاطر' }] }
    }
};

let materials = [
    { id: 1, target: 'cs_shared', year: '3', title: 'سلايدات المحاضرة الأولى - نظم التشغيل', subject: 'نظم التشغيل (Operating Systems)', doctor: 'د. خالد عبد الرحيم', size: '3.5 MB' },
    { id: 2, target: 'cs', year: '3', title: 'شيت العملي - الذكاء الاصطناعي', subject: 'الذكاء الاصطناعي والشبكات العصبية', doctor: 'د. طارق زياد', size: '2.1 MB' },
    { id: 3, target: 'y1', year: '1', title: 'مقدمة في علوم الحاسوب - المحاضرة 1', subject: 'مقدمة في علوم الحاسوب والبرمجة', doctor: 'د. داليا طه إبراهيم', size: '4.2 MB' },
    { id: 4, target: 'y2', year: '2', title: 'شيت هياكل البيانات - List & Array', subject: 'هياكل البيانات والخوارزميات (1)', doctor: 'د. طارق زياد', size: '1.8 MB' }
];

function initApp() {
    renderYearsBar();
    renderContent();
}

function renderYearsBar() {
    const bar = document.getElementById('years-bar');
    const years = [
        { id: '1', label: 'السنة الأولى (كود 2526)' },
        { id: '2', label: 'السنة الثانية (كود 2324)' },
        { id: '3', label: 'السنة الثالثة (كود 2122)' },
        { id: '4', label: 'السنة الرابعة (كود 1920)' },
        { id: '5', label: 'السنة الخامسة (كود 0018)' }
    ];
    bar.innerHTML = years.map(y => `
        <button onclick="selectYear('${y.id}')" class="px-3 py-2.5 rounded-xl text-xs font-extrabold border transition text-center ${selectedYear === y.id ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow' : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'}">
            ${y.label}
        </button>
    `).join('');
}

function selectYear(yr) {
    selectedYear = yr;
    libTab = 'shared';
    renderYearsBar();
    renderContent();
    syncDoctorUploadForm();
}

function syncDoctorUploadForm() {
    const upYearSelect = document.getElementById('up-year');
    const autoBadge = document.getElementById('auto-year-badge');
    if (upYearSelect) {
        upYearSelect.value = selectedYear;
    }
    if (autoBadge) {
        const codePrefixes = { '1': '2526', '2': '2324', '3': '2122', '4': '1920', '5': '0018' };
        autoBadge.textContent = `السنة المستهدفة حالياً: السنة ${selectedYear} (كود ${codePrefixes[selectedYear]})`;
    }
    onUploadYearChange(selectedYear);
}

function onUploadYearChange(yr) {
    const container = document.getElementById('dynamic-form-fields');
    if (!container) return;

    if (yr === '1' || yr === '2') {
        container.innerHTML = `
            <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">اختر الفصل الدراسي (السمستر):</label>
                <select id="up-sem" onchange="updateSubListForYear12('${yr}', this.value)" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                    <option value="sem1">السمستر الأول (7 مواد)</option>
                    <option value="sem2">السمستر الثاني (7 مواد)</option>
                </select>
            </div>
            <div class="md:col-span-2">
                <label class="block text-xs font-bold text-slate-300 mb-1">اختر المادة المحددة تنزل فيها المحاضرة *</label>
                <select id="up-subject-select" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold focus:outline-none">
                    <!-- يضاف آلياً -->
                </select>
            </div>
        `;
        updateSubListForYear12(yr, 'sem1');
    } else if (yr === '3' || yr === '4') {
        container.innerHTML = `
            <div>
                <label class="block text-xs font-bold text-slate-300 mb-1">نوع المكتبة والمقرر *</label>
                <select id="up-category-type" onchange="updateSubListForYear34('${yr}', this.value)" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none">
                    <option value="shared_cs">المحاضرات المشتركة (تخصصات الحاسوب)</option>
                    <option value="shared_math">المحاضرات المشتركة (تخصصات الرياضيات)</option>
                    <option value="spec_cs">تخصص علوم الحاسوب (CS)</option>
                    <option value="spec_it">تخصص تقنية المعلومات (IT)</option>
                    <option value="spec_net">تخصص الشبكات (Networks)</option>
                    <option value="spec_math">تخصص الرياضيات (Math)</option>
                    <option value="spec_stat">تخصص الإحصاء (Stat)</option>
                </select>
            </div>
            <div class="md:col-span-2">
                <label class="block text-xs font-bold text-slate-300 mb-1">اختر المادة المستهدفة مباشرة *</label>
                <select id="up-subject-select" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-amber-300 font-bold focus:outline-none">
                    <!-- يضاف آلياً -->
                </select>
            </div>
        `;
        updateSubListForYear34(yr, 'shared_cs');
    } else {
        container.innerHTML = `
            <div class="md:col-span-3">
                <label class="block text-xs font-bold text-slate-300 mb-1">اسم ومادة مشروع التخرج للسنة الخامسة (كود 0018) *</label>
                <input type="text" id="up-subject-text" required placeholder="مثال: CS0018-501 - مشروع التخرج والبحث التطبيقي" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none">
            </div>
        `;
    }
}

function updateSubListForYear12(yr, sem) {
    const selectEl = document.getElementById('up-subject-select');
    if (!selectEl) return;
    const subList = yr === '1' ? (sem === 'sem1' ? year1Semesters.sem1 : year1Semesters.sem2) : (sem === 'sem1' ? year2Semesters.sem1 : year2Semesters.sem2);
    selectEl.innerHTML = subList.map(s => `<option value="${s.name} [${s.code}]">${s.code} - ${s.name}</option>`).join('');
}

function updateSubListForYear34(yr, type) {
    const selectEl = document.getElementById('up-subject-select');
    if (!selectEl) return;

    let items = [];
    if (type === 'shared_cs') {
        items = sharedSubjectsConfig[yr].cs;
    } else if (type === 'shared_math') {
        items = sharedSubjectsConfig[yr].math;
    } else {
        const keyMap = { spec_cs: 'cs', spec_it: 'it', spec_net: 'networks', spec_math: 'math', spec_stat: 'stat' };
        const key = keyMap[type];
        items = (specializedConfig[yr] && specializedConfig[yr][key]) ? specializedConfig[yr][key].subjects : [];
    }
    selectEl.innerHTML = items.map(s => `<option value="${s.name} [${s.code}]">${s.code} - ${s.name}</option>`).join('');
}

function switchTab(tab) {
    currentTab = tab;
    document.getElementById('tab-timetable-btn').className = `px-4 py-2 rounded-xl text-xs font-extrabold transition ${tab === 'timetable' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`;
    document.getElementById('tab-materials-btn').className = `px-4 py-2 rounded-xl text-xs font-extrabold transition ${tab === 'materials' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'}`;
    renderContent();
}

function switchRole(role) {
    if (role === 'doctor' && currentRole !== 'doctor') {
        document.getElementById('auth-modal').classList.remove('hidden');
    } else {
        currentRole = 'student';
        document.getElementById('role-student-btn').className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-indigo-600 text-white shadow';
        document.getElementById('role-doctor-btn').className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition text-slate-400 hover:text-white';
        document.getElementById('doctor-upload-panel').classList.add('hidden');
    }
}

function verifyPassword(e) {
    e.preventDefault();
    const pass = document.getElementById('doc-pass').value;
    if (pass === 'bahri123') {
        currentRole = 'doctor';
        document.getElementById('auth-modal').classList.add('hidden');
        document.getElementById('doc-pass').value = '';
        document.getElementById('pass-err').classList.add('hidden');
        document.getElementById('role-doctor-btn').className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition bg-indigo-600 text-white shadow';
        document.getElementById('role-student-btn').className = 'px-3.5 py-1.5 rounded-lg text-xs font-bold transition text-slate-400 hover:text-white';
        document.getElementById('doctor-upload-panel').classList.remove('hidden');
        syncDoctorUploadForm();
        showToast('تم تسجيل الدخول بنجاح إلى لوحة المحاضر!');
    } else {
        document.getElementById('pass-err').classList.remove('hidden');
    }
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
}

function handleSearch(q) {
    searchQuery = q.toLowerCase();
    renderContent();
}

function handleUploadSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('up-title').value;
    const yearVal = document.getElementById('up-year').value;
    
    let subjectStr = '';
    const selectEl = document.getElementById('up-subject-select');
    const textEl = document.getElementById('up-subject-text');

    if (selectEl) {
        subjectStr = selectEl.value;
    } else if (textEl) {
        subjectStr = textEl.value;
    }

    const cleanSubjectName = subjectStr.split(' [')[0];

    const newMat = {
        id: Date.now(),
        target: `y${yearVal}`,
        year: yearVal,
        title: title,
        subject: cleanSubjectName,
        doctor: 'د. داليا طه إبراهيم',
        size: '3.2 MB'
    };

    materials.unshift(newMat);
    e.target.reset();
    onUploadYearChange(yearVal);
    showToast(`تم رفع المحاضرة (${title}) بنجاح وتنزل فوراً لمادة: ${cleanSubjectName}!`);
    renderContent();
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    document.getElementById('toast-message').textContent = msg;
    container.classList.remove('hidden');
    setTimeout(() => { container.classList.add('hidden'); }, 3500);
}

function renderContent() {
    const area = document.getElementById('main-content-area');
    if (currentTab === 'timetable') {
        renderTimetable(area);
    } else {
        renderMaterialsLibrary(area);
    }
}

function renderTimetable(container) {
    let list = [];
    if (selectedYear === '1') {
        list = selectedSem === 'sem1' ? year1Semesters.sem1 : year1Semesters.sem2;
    } else if (selectedYear === '2') {
        list = selectedSem === 'sem1' ? year2Semesters.sem1 : year2Semesters.sem2;
    } else if (selectedYear === '3' || selectedYear === '4' || selectedYear === '5') {
        const yearConfig = timetableSpecSchedules[selectedYear] || {};
        list = yearConfig[selectedScheduleSpec] || [];
    }

    const filtered = list.filter(item => {
        if (item.day !== selectedDay) return false;
        if (searchQuery) {
            return item.name.toLowerCase().includes(searchQuery) || item.doctor.toLowerCase().includes(searchQuery) || item.code.toLowerCase().includes(searchQuery);
        }
        return true;
    });

    container.innerHTML = `
        <div class="space-y-5">
            ${(selectedYear === '1' || selectedYear === '2') ? `
                <div class="flex items-center gap-2 bg-slate-900/80 p-2 rounded-xl border border-slate-800 w-fit">
                    <button onclick="selectedSem='sem1'; renderContent();" class="px-4 py-1.5 rounded-lg text-xs font-bold transition ${selectedSem === 'sem1' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">السمستر الأول (7 مواد)</button>
                    <button onclick="selectedSem='sem2'; renderContent();" class="px-4 py-1.5 rounded-lg text-xs font-bold transition ${selectedSem === 'sem2' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">السمستر الثاني (7 مواد)</button>
                </div>
            ` : ''}

            ${(selectedYear === '3' || selectedYear === '4' || selectedYear === '5') ? `
                <div class="glass-panel p-3 rounded-2xl space-y-2">
                    <h4 class="text-xs font-extrabold text-amber-300 flex items-center gap-2">
                        <i class="fa-solid fa-filter"></i> اختر التخصص لعرض جدوله المنفصل:
                    </h4>
                    <div class="flex flex-wrap items-center gap-2">
                        <button onclick="selectedScheduleSpec='cs'; renderContent();" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${selectedScheduleSpec === 'cs' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}">علوم الحاسوب (CS)</button>
                        <button onclick="selectedScheduleSpec='it'; renderContent();" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${selectedScheduleSpec === 'it' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}">تقنية المعلومات (IT)</button>
                        <button onclick="selectedScheduleSpec='networks'; renderContent();" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${selectedScheduleSpec === 'networks' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}">الشبكات (Networks)</button>
                        <span class="text-slate-600">|</span>
                        <button onclick="selectedScheduleSpec='math'; renderContent();" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${selectedScheduleSpec === 'math' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}">الرياضيات (Math)</button>
                        <button onclick="selectedScheduleSpec='stat'; renderContent();" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${selectedScheduleSpec === 'stat' ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}">الإحصاء (Statistics)</button>
                    </div>
                </div>
            ` : ''}

            <div class="flex items-center justify-between overflow-x-auto pb-2">
                <span class="text-xs font-bold text-slate-400">اختر اليوم الدراسي:</span>
                <div class="flex items-center gap-2">
                    ${activeDays.map(d => `
                        <button onclick="selectedDay='${d}'; renderContent();" class="px-5 py-2 rounded-xl text-xs font-extrabold transition ${selectedDay === d ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 text-slate-400 border border-slate-800'}">
                            ${d}
                        </button>
                    `).join('')}
                </div>
            </div>

            ${filtered.length === 0 ? `
                <div class="glass-panel p-12 text-center text-slate-400 rounded-2xl">
                    <i class="fa-regular fa-calendar-xmark text-3xl mb-2 text-slate-600"></i>
                    <p class="text-xs font-bold">لا توجد محاضرات مجدولة يوم (${selectedDay}) للتخصص المحدد أو مطابقة لبحثك.</p>
                </div>
            ` : `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${filtered.map(item => `
                        <div class="glass-panel p-5 rounded-2xl space-y-4 hover:border-indigo-500/50 transition">
                            <div class="flex justify-between items-start">
                                <span class="px-2.5 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded font-mono text-[11px] font-bold">${item.code}</span>
                                <span class="text-[10px] text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">جدول التخصص</span>
                            </div>
                            <h3 class="font-extrabold text-sm text-slate-100">${item.name}</h3>
                            <p class="text-xs text-indigo-400 font-medium"><i class="fa-solid fa-user-tie ml-1"></i> ${item.doctor}</p>
                            <div class="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                                <div class="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                                    <i class="fa-regular fa-clock text-amber-400"></i>
                                    <span>التوقيت: <strong>${item.time}</strong></span>
                                </div>
                                <div class="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                                    <i class="fa-solid fa-location-dot text-emerald-400"></i>
                                    <span>القاعة: <strong>${item.hall}</strong></span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

function renderMaterialsLibrary(container) {
    if (selectedYear === '1' || selectedYear === '2') {
        const subList = selectedYear === '1'
            ? (selectedSem === 'sem1' ? year1Semesters.sem1 : year1Semesters.sem2)
            : (selectedSem === 'sem1' ? year2Semesters.sem1 : year2Semesters.sem2);
        container.innerHTML = `
            <div class="space-y-6">
                <div class="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 class="text-sm font-extrabold text-white">مكتبة السنة ${selectedYear === '1' ? 'الأولى (أكواد 2526)' : 'الثانية (أكواد 2324)'} - (7 مواد لكل سمستر)</h3>
                        <p class="text-xs text-slate-400">جميع المقررات المعتمدة والمحاضرات المرفوعة من قبل الدكاترة.</p>
                    </div>
                    <div class="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                        <button onclick="selectedSem='sem1'; renderContent();" class="px-4 py-2 rounded-lg text-xs font-bold transition ${selectedSem === 'sem1' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">السمستر الأول (7 مواد)</button>
                        <button onclick="selectedSem='sem2'; renderContent();" class="px-4 py-2 rounded-lg text-xs font-bold transition ${selectedSem === 'sem2' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">السمستر الثاني (7 مواد)</button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${subList.map(sub => {
                        const files = materials.filter(m => m.year === selectedYear && (m.subject.includes(sub.name) || sub.name.includes(m.subject) || m.code === sub.code) && (!searchQuery || m.title.toLowerCase().includes(searchQuery) || m.doctor.toLowerCase().includes(searchQuery)));
                        return `
                            <div class="glass-panel p-4 rounded-2xl space-y-3">
                                <div class="flex justify-between items-start border-b border-slate-800 pb-2">
                                    <span class="px-2 py-0.5 bg-amber-500/10 text-amber-300 rounded text-[10px] font-mono font-bold">${sub.code}</span>
                                    <span class="text-[10px] text-slate-400">${files.length} محاضرات</span>
                                </div>
                                <h4 class="font-bold text-sm text-white">${sub.name}</h4>
                                <p class="text-[11px] text-indigo-400"><i class="fa-solid fa-user-tie ml-1"></i> ${sub.doctor}</p>
                                <div class="space-y-2 pt-2">
                                    ${files.length === 0 ? '<p class="text-[11px] text-slate-500">لا توجد ملفات مرفوعة لهذه المادة بعد.</p>' : files.map(f => `
                                        <div class="bg-slate-950 p-2.5 rounded-xl flex items-center justify-between text-xs border border-slate-800">
                                            <div class="truncate">
                                                <span class="truncate text-slate-200 block font-bold text-[11px]">${f.title}</span>
                                                <span class="text-[10px] text-slate-400">${f.doctor} • ${f.size}</span>
                                            </div>
                                            <button onclick="showToast('جاري تحميل: ${f.title}')" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold shrink-0">تحميل</button>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    } else if (selectedYear === '3' || selectedYear === '4') {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 class="text-sm font-extrabold text-white">مكتبة السنة ${selectedYear === '3' ? 'الثالثة (أكواد 2122)' : 'الرابعة (أكواد 1920)'}</h3>
                        <p class="text-xs text-slate-400">تصفح المحاضرات المشتركة أو تخصصات الكلية منفصلة.</p>
                    </div>
                    <div class="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                        <button onclick="libTab='shared'; renderContent();" class="px-4 py-2 rounded-lg text-xs font-bold transition ${libTab === 'shared' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">المحاضرات المشتركة</button>
                        <button onclick="libTab='specialized'; renderContent();" class="px-4 py-2 rounded-lg text-xs font-bold transition ${libTab === 'specialized' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}">مكتبة التخصصات</button>
                    </div>
                </div>

                ${libTab === 'shared' ? `
                    <div class="space-y-4">
                        <div class="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-fit">
                            <button onclick="sharedDeptGroup='cs'; renderContent();" class="px-4 py-1.5 rounded-lg text-xs font-bold transition ${sharedDeptGroup === 'cs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}">تخصصات الحاسوب</button>
                            <button onclick="sharedDeptGroup='math'; renderContent();" class="px-4 py-1.5 rounded-lg text-xs font-bold transition ${sharedDeptGroup === 'math' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}">تخصصات الرياضيات</button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            ${(sharedSubjectsConfig[selectedYear][sharedDeptGroup] || []).map(sub => {
                                const files = materials.filter(m => m.year === selectedYear && (m.subject.includes(sub.name) || sub.name.includes(m.subject) || m.code === sub.code) && (!searchQuery || m.title.toLowerCase().includes(searchQuery) || m.doctor.toLowerCase().includes(searchQuery)));
                                return `
                                    <div class="glass-panel p-4 rounded-2xl space-y-3">
                                        <div class="flex justify-between items-start border-b border-slate-800 pb-2">
                                            <span class="px-2 py-0.5 bg-amber-500/10 text-amber-300 rounded text-[10px] font-mono font-bold">${sub.code}</span>
                                            <span class="text-[10px] text-slate-400">${files.length} محاضرات</span>
                                        </div>
                                        <h4 class="font-bold text-sm text-white">${sub.name}</h4>
                                        <p class="text-[11px] text-indigo-400"><i class="fa-solid fa-user-tie ml-1"></i> ${sub.doctor}</p>
                                        <div class="space-y-2 pt-2">
                                            ${files.length === 0 ? '<p class="text-[11px] text-slate-500">لا توجد ملفات مرفوعة لهذه المادة بعد.</p>' : files.map(f => `
                                                <div class="bg-slate-950 p-2.5 rounded-xl flex items-center justify-between text-xs border border-slate-800">
                                                    <div class="truncate">
                                                        <span class="truncate text-slate-200 block font-bold text-[11px]">${f.title}</span>
                                                        <span class="text-[10px] text-slate-400">${f.doctor} • ${f.size}</span>
                                                    </div>
                                                    <button onclick="showToast('جاري تحميل: ${f.title}')" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[10px] font-bold shrink-0">تحميل</button>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : `
                    <div class="space-y-4">
                        <div class="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-fit">
                            <button onclick="specDeptGroup='cs'; renderContent();" class="px-4 py-1.5 rounded-lg text-xs font-bold transition ${specDeptGroup === 'cs' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}">تخصصات الحاسوب</button>
                            <button onclick="specDeptGroup='math'; renderContent();" class="px-4 py-1.5 rounded-lg text-xs font-bold transition ${specDeptGroup === 'math' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}">تخصصات الرياضيات</button>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${Object.keys(specializedConfig[selectedYear] || {})
                                .filter(key => specDeptGroup === 'cs' ? ['cs','it','networks'].includes(key) : ['math','stat'].includes(key))
                                .map(key => {
                                    const spec = specializedConfig[selectedYear][key];
                                    return `
                                        <div class="glass-panel p-4 rounded-2xl space-y-3">
                                            <h4 class="font-bold text-sm text-amber-300 border-b border-slate-800 pb-2"><i class="fa-solid fa-bookmark ml-1.5"></i> ${spec.title}</h4>
                                            <div class="grid grid-cols-1 gap-3">
                                                ${spec.subjects.map(sub => {
                                                    const files = materials.filter(m => m.year === selectedYear && (m.subject.includes(sub.name) || sub.name.includes(m.subject) || m.code === sub.code) && (!searchQuery || m.title.toLowerCase().includes(searchQuery) || m.doctor.toLowerCase().includes(searchQuery)));
                                                    return `
                                                        <div class="bg-slate-950 p-3 rounded-xl space-y-2 border border-slate-800">
                                                            <div class="flex justify-between items-center">
                                                                <span class="text-xs font-bold text-white">${sub.name}</span>
                                                                <span class="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 rounded font-mono text-[10px] font-bold">${sub.code}</span>
                                                            </div>
                                                            ${files.length === 0 ? '<p class="text-[10px] text-slate-500">لا توجد ملفات تخصصية مرفوعة بعد.</p>' : files.map(f => `
                                                                <div class="flex items-center justify-between text-xs pt-1 border-t border-slate-900">
                                                                    <span class="text-slate-300 text-[11px] truncate">${f.title}</span>
                                                                    <button onclick="showToast('جاري تحميل: ${f.title}')" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold shrink-0">تحميل</button>
                                                                </div>
                                                            `).join('')}
                                                        </div>
                                                    `;
                                                }).join('')}
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                        </div>
                    </div>
                `}
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="glass-panel p-12 text-center text-slate-400 rounded-2xl">
                <i class="fa-solid fa-graduation-cap text-4xl mb-3 text-amber-400"></i>
                <h3 class="text-sm font-bold text-white mb-1">السنة الخامسة (بكالوريوس الشرف - كود 0018)</h3>
                <p class="text-xs text-slate-400">مخصصة لمشروع التخرج والبحوث التطبيقية في الحاسوب والرياضيات.</p>
            </div>
        `;
    }
}

window.onload = initApp;