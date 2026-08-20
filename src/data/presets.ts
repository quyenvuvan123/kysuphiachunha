import { ContentPillar, PillarInfo, KnowledgeItem } from "../types";

export const PILLARS_CONFIG: PillarInfo[] = [
  {
    id: "pillar1_mep_tech",
    name: "Trụ 1: 4 Lớp Kỹ Thuật (Báo giá, MEP, Bản vẽ, Hợp đồng)",
    percentage: 40,
    description: "Dạy kiến thức cốt lõi: cách soi mã vật tư, đọc bản vẽ cơ điện, tiêu chuẩn ống nước PPR, dây điện ruột đặc, van khóa, chống thấm 3 lớp.",
    badgeColor: "bg-blue-900/40 text-blue-300 border-blue-700/50",
    iconName: "Wrench",
  },
  {
    id: "pillar2_case_debunk",
    name: "Trụ 2: Case Thật / Vạch Lỗi (Bóc Phốt Báo Giá)",
    percentage: 20,
    description: "Vạch trần chiêu trò lấp lửng từ hồ sơ báo giá thật đã ẩn danh: bẫy phát sinh 20-40%, thiếu chống thấm, mập mờ mét dài.",
    badgeColor: "bg-amber-900/40 text-amber-300 border-amber-700/50",
    iconName: "ShieldAlert",
  },
  {
    id: "pillar3_market_trends",
    name: "Trụ 3: Thị Trường & Xu Hướng 2026-2027",
    percentage: 15,
    description: "Phân tích bối cảnh bàn giao chung cư Hà Nội, biến động giá đồng/ống nhựa, giá nhân công thợ, bài toán dòng tiền & lãi vay nhận nhà.",
    badgeColor: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
    iconName: "TrendingUp",
  },
  {
    id: "pillar4_behind_scenes",
    name: "Trụ 4: Hậu Trường Nghề 15 Năm MEP",
    percentage: 15,
    description: "Câu chuyện thực chiến 15 năm làm MEP và quản lý công trình tại Hà Nội, những pha cứu chủ nhà thoát cảnh đập đi làm lại.",
    badgeColor: "bg-purple-900/40 text-purple-300 border-purple-700/50",
    iconName: "HardHat",
  },
  {
    id: "pillar5_conversion",
    name: "Trụ 5: Lời Mời / Chuyển Đổi (Gói Audit 1.5 - 3 Tr)",
    percentage: 10,
    description: "Mời sử dụng dịch vụ Audit hồ sơ báo giá trước khi ký (1.5 - 3 triệu), gói Đại diện kiểm soát cải tạo, Workshop soát lỗi cho chủ nhà.",
    badgeColor: "bg-rose-900/40 text-rose-300 border-rose-700/50",
    iconName: "CheckCircle2",
  },
];

export const PRESET_TOPICS: {
  pillar: ContentPillar;
  title: string;
  topic: string;
  specificDetails: string;
  targetAudience: string;
  ctaType: string;
}[] = [
  {
    pillar: "pillar1_mep_tech",
    title: "Bẫy ống nước Tiền Phong C1 vs C2/C3 trong hộp kỹ thuật",
    topic: "Phân biệt cấp áp lực ống PPR Tiền Phong và cạm bẫy dùng ống mỏng dẫn nước nóng",
    specificDetails: "Nhiều nhà thầu chỉ ghi chung chung 'Ống nước nóng lạnh Tiền Phong' nhưng âm tường lại đi loại C1 (áp lực thấp) thay vì PN16 hoặc PN20 cho nước nóng, sau 2 năm co ngót bục mối hàn gây ngập sàn gỗ 50 triệu.",
    targetAudience: "Chủ nhà chung cư mới nhận thô chuẩn bị làm đường nước vệ sinh",
    ctaType: "Gửi báo giá qua tin nhắn để Kỹ Sư Quyền soi mã vật tư chuẩn",
  },
  {
    pillar: "pillar1_mep_tech",
    title: "Dây điện Cadisun/Trần Phú: Dấu hiệu dây nhái và bẫy thiếu dây PE tiếp địa",
    topic: "Tiêu chuẩn chọn tiết diện dây điện ổ cắm bếp, điều hòa và bắt buộc phải có dây PE chống rò điện",
    specificDetails: "Căn hộ dùng bếp từ 4000W và lò nướng nhưng thợ đi dây 2.5mm² thay vì 4.0mm²; bảng báo giá không có mục thi công cọc tiếp địa hoặc kéo dây PE nối đất vào ổ cắm 3 chấu.",
    targetAudience: "Chủ nhà chuẩn bị hoàn thiện nội thất chung cư cao cấp",
    ctaType: "Đăng ký Audit hồ sơ điện nước để an tâm không chập cháy",
  },
  {
    pillar: "pillar2_case_debunk",
    title: "Vạch trần báo giá 120 triệu nhưng phát sinh thêm 48 triệu (40%)",
    topic: "Case study thực tế: Nhà thầu giấu nhẹm công tháo dỡ, dặm vá bột trét và vận chuyển phế thải",
    specificDetails: "Hồ sơ ban đầu chỉ ghi 'Trọn gói cải tạo phòng khách bếp', đến khi đập tường thì tính thêm tiền: vận chuyển phế thải xuống sảnh (8 triệu), dặm vá trát lại tường ẩm (12 triệu), đi lại ống đồng điều hòa phát sinh 15 triệu.",
    targetAudience: "Chủ nhà chung cư cũ đang tìm thầu sửa chữa tại Hà Nội",
    ctaType: "Chi 1.5 - 3 triệu Audit trước để khóa chặt ngân sách, chặn đứng bẫy phát sinh",
  },
  {
    pillar: "pillar2_case_debunk",
    title: "Đố tương tác: Nhìn ra 3 lỗi chết người trong báo giá chống thấm này?",
    topic: "Báo giá chống thấm WC ghi 'Quét Sika trọn gói 1 lớp' và không ghi xử lý cổ ống",
    specificDetails: "Chống thấm sàn WC chỉ quét 1 lớp Sikatop Seal 107 mỏng dính, không bo góc chân tường bằng lưới sợi thủy tinh, không quấn thanh trương nở cổ ống thoát sàn.",
    targetAudience: "Cộng đồng chủ nhà chung cư Vinhome, Masteri",
    ctaType: "Comment đáp án bên dưới, Kỹ Sư Quyền sẽ inbox phân tích chi tiết",
  },
  {
    pillar: "pillar3_market_trends",
    title: "Bối cảnh bàn giao chung cư Hà Nội 2026-2027: Giá thợ tăng và rủi ro nhận nhà vội",
    topic: "Biến động chi phí hoàn thiện nội thất và áp lực lãi suất ngân hàng khi nhận bàn giao",
    specificDetails: "Làn sóng bàn giao căn hộ mới tại Tây Mỗ, Gia Lâm, Đông Anh năm 2026; thợ làm ẩu chạy tiến độ nhận nhiều công trình cùng lúc; chủ nhà bị áp lực trả nợ ngân hàng nên dễ gật đầu với báo giá rẻ mạt ban đầu.",
    targetAudience: "Chủ nhà chuẩn bị nhận chìa khóa căn hộ giai đoạn 2026-2027",
    ctaType: "Cần một người đứng về phía bạn kiểm soát chất lượng? Inbox ngay",
  },
  {
    pillar: "pillar4_behind_scenes",
    title: "15 năm làm MEP: Vì sao tôi chọn đứng về phía chủ nhà thay vì làm thầu trọn gói?",
    topic: "Tâm sự nghề kỹ sư độc lập: Không bán vật tư, không ăn hoa hồng nhà máy",
    specificDetails: "Nếu vừa thầu vừa giám sát thì 'vừa đá bóng vừa thổi còi', thợ làm ẩu sẽ giấu nhẹm. Tôi chọn làm Kỹ sư phía chủ nhà, thu đúng phí Audit 1.5 - 3 triệu và phí đại diện để chỉ bảo vệ một thứ duy nhất: Túi tiền và sự an toàn của chủ nhà.",
    targetAudience: "Toàn bộ chủ nhà cần một chuyên gia kỹ thuật trung lập, có tâm",
    ctaType: "Liên hệ tư vấn gói Đại diện kiểm soát cải tạo",
  },
  {
    pillar: "pillar5_conversion",
    title: "Gói Audit Hồ Sơ Báo Giá 1.5 - 3 Triệu: Tiết kiệm 30 - 70 Triệu tiền phát sinh",
    topic: "Giới thiệu dịch vụ Audit trước khi đặt bút ký hợp đồng cải tạo căn hộ",
    specificDetails: "Quy trình Audit 4 Lớp Kỹ Thuật trong 24h: Soi từng dòng vật tư, bóc tách khối lượng ẩn, chỉ rõ điều khoản rủi ro trong hợp đồng, cung cấp bảng phản biện ép nhà thầu cam kết không phát sinh.",
    targetAudience: "Chủ nhà đang cầm trên tay 2-3 bảng báo giá của các đội thầu",
    ctaType: "Gửi file báo giá ngay hôm nay để nhận báo cáo Audit 4 lớp",
  },
];

export const SAMPLE_QUOTATIONS = [
  {
    title: "Báo giá trọn gói 75m2 chung cư Nam Từ Liêm (Có nhiều bẫy phát sinh)",
    apartmentType: "Chung cư 2PN + 1WC (75m2) bàn giao thô",
    budgetExpected: "180.000.000 VNĐ",
    text: `BẢNG BÁO GIÁ CẢI TẠO NỘI THẤT CĂN HỘ 75M2
1. Phá dỡ & Xây tường ngăn phòng ngủ: Trọn gói 12.000.000đ (chưa bao gồm phế thải nếu quá 3 chuyến)
2. Thi công điện nước cải tạo: Trọn gói 28.000.000đ (Vật tư dây Cadisun hoặc tương đương, ống nước Tiền Phong)
3. Chống thấm sàn nhà vệ sinh & ban công: Quét Sika chống thấm 1 lớp trọn gói 4.500.000đ
4. Thi công trần thạch cao phòng khách + 2 phòng ngủ: Khung xương Vĩnh Tường tấm tiêu chuẩn 9mm (180.000đ/m2 - Khối lượng đo theo thực tế sau hoàn thiện)
5. Cửa nhôm kính ban công & cửa sổ: Nhôm Xingfa kính dán an toàn (2.100.000đ/m2)
6. Sơn bả tường toàn bộ căn hộ: Sơn Maxilite 1 lớp lót 2 lớp phủ (55.000đ/m2)
7. Ốp lát gạch nhà vệ sinh: 150.000đ/m2 (Chủ nhà tự cấp gạch, thầu cấp cát xi măng)
Ghi chú: Khối lượng thực tế sẽ nghiệm thu trên công trình. Phát sinh tính theo đơn giá thỏa thuận.`,
  },
  {
    title: "Báo giá cải tạo điện nước căn hộ chung cư cũ 90m2 Hoàng Mai",
    apartmentType: "Chung cư cũ 90m2 cần thay toàn bộ hệ thống MEP",
    budgetExpected: "95.000.000 VNĐ cho phần cơ điện nước",
    text: `HẠNG MỤC CƠ ĐIỆN NƯỚC:
1. Đục cắt tường, đi lại ống luồn dây điện: 85.000đ/md
2. Kéo dây điện nguồn chính & ổ cắm: Dây điện chất lượng cao (Trọn gói 18.000.000đ)
3. Lắp đặt tủ điện căn hộ: 01 tủ điện âm tường + Aptomat tổng (3.500.000đ)
4. Đi lại đường ống cấp nước nóng lạnh bằng ống nhiệt: 140.000đ/md
5. Đi lại ống thoát nước bồn cầu, chậu rửa, phễu thu sàn: 110.000đ/md
6. Lắp đặt thiết bị vệ sinh: 350.000đ/bộ
Lưu ý: Chưa bao gồm van khóa tổng, chưa bao gồm dây tiếp địa, chưa bao gồm chi phí kiểm tra áp lực nước.`,
  },
];

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: "kb-1",
    category: "mep_plumbing",
    title: "Bẫy ống nước PPR dùng loại mỏng C1 cho đường nước nóng",
    severity: "critical",
    description: "Nhà thầu thường báo chung chung 'Ống Tiền Phong' hoặc 'Ống Dekko' nhưng âm tường lại đi loại Class 1 (áp lực PN10). Khi bật bình nóng lạnh 80°C liên tục, ống nhanh giòn, phồng rộp và bục tại các đầu co nối.",
    badPractice: "Báo giá ghi: 'Hệ thống ống nước PPR Tiền Phong trọn gói'. Không ghi rõ Class độ dày và áp lực danh định PN.",
    goodPractice: "Bắt buộc ghi rõ: 'Ống PPR Tiền Phong PN16 cho nước lạnh, PN20 cho nước nóng, phụ kiện đồng bộ cùng hãng'.",
    engineerTip: "Trước khi trát tường, bắt buộc phải test áp lực nước ở 8-10 bar giữ nguyên trong 24 giờ. Nếu áp tụt quá 0.2 bar thì cấm nghiệm thu!",
  },
  {
    id: "kb-2",
    category: "mep_electrical",
    title: "Cắt giảm dây tiếp địa PE và dùng Aptomat MCB thay vì RCBO chống giật",
    severity: "critical",
    description: "Nhiều căn hộ chung cư thợ chỉ kéo 2 dây L (Pha) và N (Trung tính), bỏ quên dây tiếp địa PE màu vàng sọc xanh. Tủ điện chỉ lắp MCB (chỉ chống quá tải, không chống giật người khi chạm rò điện).",
    badPractice: "Báo giá chỉ ghi 'Aptomat Panasonic/Schneider trọn gói tủ', không có RCBO/ELCB cho khu vực ẩm ướt như WC, bình nóng lạnh, bếp từ.",
    goodPractice: "Mỗi nhánh ổ cắm WC, bếp, bình nước nóng bắt buộc phải qua RCBO độ nhạy 30mA, cắt điện trong 0.03 giây khi có rò điện.",
    engineerTip: "15 năm làm nghề tôi chưa bao giờ cho phép bỏ qua dây PE. Nó là dây cứu mạng cho con nhỏ khi nghịch ổ cắm!",
  },
  {
    id: "kb-3",
    category: "waterproofing",
    title: "Chống thấm kiểu 'hàng mã': Quét 1 lớp Sika không bo lưới cổ ống",
    severity: "critical",
    description: "90% vụ thấm dột sàn vệ sinh chung cư là do thợ không đục mở rộng quanh cổ ống thoát sàn để quấn thanh cao su trương nở (Hydrotite/SikaSwell) và đổ vữa không co ngót SikaGrout.",
    badPractice: "Chỉ quét nước xi măng hoặc 1 lớp hóa chất chống thấm mỏng lên mặt bê tông mà không xử lý chân tường cao 30cm.",
    goodPractice: "Quy trình 4 bước: Đục cổ ống -> Quấn thanh trương nở + đổ SikaGrout -> Bo góc chân tường lưới thủy tinh -> Quét 2-3 lớp màng xi măng polymer 2 thành phần (Sikatop Seal 107 / MasterSeal). Ngâm nước thử tải 48h.",
    engineerTip: "Phải ngâm thử nước tối thiểu 48 tiếng và xin phép bảo vệ/hàng xóm tầng dưới lên ngó trần thạch cao của họ xem có ẩm không trước khi lát gạch!",
  },
  {
    id: "kb-4",
    category: "quotation_traps",
    title: "Cạm bẫy 'Vật tư tương đương' và đo khối lượng nghiệm thu sau",
    severity: "high",
    description: "Ghi 'Sơn Dulux hoặc tương đương', 'Dây Cadisun hoặc tương đương'. Đến lúc thi công nhà thầu đưa loại thương hiệu lạ hoắc vào ép chủ nhà chấp nhận. Hoặc cố tình báo khối lượng ban đầu thấp (ví dụ báo 50m dây điện) để tổng tiền rẻ, khi làm xong đo ra 180m bắt trả thêm tiền phát sinh.",
    badPractice: "Báo giá không có cột Mã sản phẩm (Code), Tiêu chuẩn kỹ thuật, và Cam kết sai số khối lượng không vượt quá 5%.",
    goodPractice: "Hợp đồng bắt buộc ghi: 'Mọi thay đổi nhãn hiệu phải có văn bản đồng ý của Chủ nhà. Khối lượng trọn gói (Lump-sum) theo bản vẽ đã chốt, không phát sinh trừ khi chủ nhà chủ động thay đổi thiết kế'.",
    engineerTip: "Gói Audit 1.5 - 3 triệu của tôi sinh ra chính là để siết chặt điều này, dập tắt ý định 'cài cắm câu chữ' ngay từ ngày đầu.",
  },
];
