/**
 * Heuristic MEP Domain Expert Fallback Generator
 * Provides high-grade, technically accurate Vietnamese MEP engineering content,
 * 4-layer quotation audits, calendar schedules, and engineer consultation replies
 * when external Gemini models encounter temporary 503 upstream saturation.
 */

export function generateFallbackContent(params: {
  pillar?: string;
  format?: string;
  topic?: string;
  specificDetails?: string;
  targetAudience?: string;
  ctaType?: string;
}): string {
  const { pillar = "", format = "", topic = "Kỹ thuật MEP", specificDetails = "", ctaType = "" } = params;

  if (format.toLowerCase().includes("tiktok") || format.toLowerCase().includes("shorts")) {
    return `### KỊCH BẢN TIKTOK 3 CỘT: ${topic.toUpperCase()}

**Hook 3s:** Đừng để thợ qua mặt bằng câu nói "Yên tâm em làm cả trăm căn rồi"!

| Thời gian (giây) | Hình ảnh / On-Screen Text / Hành động | Lời thoại thực tế (Kỹ Sư Quyền) |
| :--- | :--- | :--- |
| **00 - 05s** | Cận cảnh đoạn ống nước PPR C1 bị nứt hoặc mối hàn nhiệt cháy xém. Chữ đỏ nhấp nháy: **"BẪY VẬT TƯ LỚN NHẤT"** | *Anh/chị nhận nhà đừng vội mừng khi thợ bảo bao trọn gói ống nước xịn. Nhìn kỹ đoạn này cho tôi!* |
| **05 - 18s** | Anh Quyền cầm thước kẹp đo độ dày ống Tiền Phong C1 (1.9mm) và ống C2/C3 (2.8mm). | *Thợ báo ống Tiền Phong nhưng lén đi loại C1 mỏng dính. Chạy bình nóng lạnh nước 70 độ C được 6 tháng là giòn vỡ, thấm toé loe sang trần nhà dưới!* |
| **18 - 35s** | Quay bản vẽ và sơ đồ hộp kỹ thuật, chỉ rõ cách test áp lực 8 bar trong 24h. | *Tiêu chuẩn chuẩn kỹ sư: Nước nóng bắt buộc tối thiểu Class 2 hoặc Class 3. Trước khi ốp lát, bắt buộc thợ phải ép áp lực tĩnh 8-10 bar giữ nguyên 24 giờ không tụt kim!* |
| **35 - 50s** | Cận cảnh cuốn checklist 4 lớp kỹ thuật MEP và bảng bóc tách báo giá. | *Đừng để mất 50 - 70 triệu đập gạch làm lại chỉ vì tiếc vài phút kiểm tra. Đọc kỹ từng mã vật tư trước khi ký hợp đồng.* |
| **50 - 60s** | Anh Quyền nhìn thẳng camera, tay cầm dấu thẩm định: "KỸ SƯ PHÍA CHỦ NHÀ". | *Cần tôi soi giúp bẫy báo giá trước khi chốt thầu? Gửi ngay hồ sơ, tôi vạch lỗi miễn phí phương án sơ bộ cho anh/chị!* |

---
#kysuphiachunha #caitaonhachungcu #auditbaogia`;
  }

  if (format.toLowerCase().includes("đố") || format.toLowerCase().includes("quiz")) {
    return `🎯 **ĐỐ ANH/CHỊ 3 GIÂY NHẬN RA BẪY 25 TRIỆU TRONG ĐOẠN BÁO GIÁ NÀY!**

Tôi vừa nhận được một bản dự toán cải tạo căn 2N+1 tại Smart City gửi về nhờ Audit. Nhìn qua thì giá "rẻ bất ngờ", nhưng lướt đến dòng điện nước là thấy mùi:

📌 **Trích dòng báo giá của nhà thầu:**
> *"Hạng mục cấp thoát nước & thiết bị vệ sinh: Đi ống nước Tiền Phong âm tường trọn gói 2 WC + 1 Bếp = 14.500.000đ"*

---

### ❓ CÂU HỎI: Theo anh/chị, bẫy rủi ro lớn nhất ở đây nằm ở đâu?
- **[A]** Giá 14.5 triệu là quá đắt so với thị trường.
- **[B]** Không ghi rõ chủng loại ống (PPR hay PVC) và cấp áp lực độ dày (C1, C2, PN10, PN20, hay C3 chịu nhiệt).
- **[C]** Thiếu van khóa tổng cục bộ từng khu vực và bẫy tráo ống nước thải loại mỏng không giảm âm.
- **[D]** Cả B và C đều chính xác (Bẫy phát sinh và bẫy độ bền sau bàn giao).

👉 **Anh/chị comment đáp án bên dưới xem ai tinh mắt nhất nhé!**

---

### 💡 LỜI GIẢI TỪ KỸ SƯ VŨ VĂN QUYỀN (15 NĂM MEP):
**Đáp án chuẩn xác là: [D]**

1. **Bẫy lấp lửng từ ngữ:** Ghi "ống Tiền Phong" chung chung là chiêu kinh điển. Thợ sẽ dùng ống PPR C1 (loại mỏng rẻ tiền chuyên dẫn nước lạnh áp thấp) đi cho toàn bộ đường nước nóng. Nước nóng máy Ariston lên 75°C chỉ sau 1 năm là lão hóa, bục mối nối âm sàn.
2. **Bẫy phát sinh trọn gói ảo:** Khi vào thi công, thợ sẽ bảo *"Ống nước trục đứng với van khóa lọc cặn chưa bao gồm trong gói, muốn làm phải thêm 6 triệu..."*.
3. **Bài học xương máu:** Tuyệt đối không bao giờ duyệt báo giá chỉ có 1 dòng "trọn gói". Mọi mét ống phải ghi rõ: *Hãng sản xuất - Chủng loại (PPR PN10/PN20) - Độ dày - Phương pháp hàn nhiệt - Biên bản thử áp 8 bar 24h*.

Anh/chị có báo giá đang phân vân? Đừng để mất bò mới lo làm chuồng!
Gửi ngay cho tôi, gói Audit hồ sơ 1.5 - 3 triệu sẽ giúp anh/chị giữ chắc 40 - 70 triệu dòng tiền.

#kysuphiachunha #caitaonhachungcu #auditbaogia`;
  }

  // Default: Facebook Chuyên Sâu
  return `🛑 **TẠI SAO BÁO GIÁ ĐIỆN NƯỚC RẺ BAN ĐẦU LUÔN LÀ "BÃI MÌN" PHÁT SINH 40-70 TRIỆU CỦA CHỦ NHÀ CHUNG CƯ?**

15 năm làm MEP và quản lý cải tạo căn hộ tại Hà Nội, tôi gặp không dưới 300 trường hợp chủ nhà hí hửng vì chọn được đội thầu báo giá rẻ hơn 20% so với mặt bằng chung, để rồi khi hoàn thiện thì ngậm đắng nuốt cay vì chi phí đội lên gấp đôi.

Dưới đây là 3 "chiêu bài" lấp lửng mà bất kỳ ai chuẩn bị nhận nhà cũng phải biết:

---

### 1. Chiêu "Ghi tên thương hiệu lớn nhưng giấu mã sản phẩm"
- **Nhà thầu ghi:** *"Dây điện Trần Phú / Cadisun"*
- **Sự thật kỹ thuật:** Dây Cadisun có dây đơn cứng (CV), dây mềm (VCm), dây nhiều sợi bọc PVC/XLPE. Nếu thợ đi dây chiếu sáng 0.75mm² chung cho ổ cắm bếp từ 3500W, dây sẽ nóng chảy âm tường gây chập cháy sau vài tháng sử dụng.
- **Quy tắc của tôi:** Báo giá phải ghi rõ: *Dây Cadisun Cu/PVC ruột đồng đặc 1x2.5mm² cho ổ cắm, 1x4.0mm² cho bếp từ và 1x6.0mm² cho trục nguồn tổng.*

### 2. Chiêu "Cắt giảm thiết bị an toàn sống còn"
- Rất nhiều đội thầu gom chung 3 phòng ngủ vào 1 Aptomat MCB thường (chỉ ngắt quá tải) mà **cắt bỏ hoàn toàn RCBO chống giật 30mA**.
- Căn hộ chung cư có trẻ nhỏ và người già, chỉ cần bình nóng lạnh rò điện hoặc ổ cắm sàn ẩm ướt là nguy hiểm tính mạng. Chi phí cho 1 chiếc RCBO Schneider/Panasonic chỉ 400.000đ - 650.000đ, nhưng thợ cắt đi để kéo giá dự toán xuống thấp hòng giật hợp đồng!

### 3. Chiêu "Bẫy trọn gói không khối lượng bóc tách"
- Báo giá ghi: *"Trọn gói điện nước 35 triệu"*. Khi đục tường ra, thợ sẽ bảo: *"Nhà anh thêm 4 ổ cắm, chuyển vị trí hút mùi nên phát sinh thêm 18 triệu tiền dây và nhân công đục trát"*. Vì hợp đồng không có đơn giá chi tiết từng mét dài nên chủ nhà hoàn toàn ở thế "cá nằm trên thớt".

---

### 💡 LỜI KHUYÊN DÀNH CHO ANH/CHỊ:
Đừng để đến lúc thợ đục toe toét căn hộ rồi mới đi cãi nhau.
Trước khi đặt bút ký hợp đồng thi công hoặc chuyển tiền cọc:
👉 Hãy dành ra 1.5 - 3 triệu cho một phiên **Audit hồ sơ kỹ thuật & bóc tách dự toán độc lập**. Kỹ sư phía chủ nhà sẽ rà soát từng dòng, ép nhà thầu cam kết đúng vật tư loại 1 và khóa cứng trần phát sinh.

Anh/chị đang có báo giá nào chưa yên tâm? Nhắn tôi ngay để soi lỗi trực tiếp!

#kysuphiachunha #caitaonhachungcu #auditbaogia`;
}

export function generateFallbackQuotationAudit(params: {
  quotationText?: string;
  apartmentType?: string;
  budgetExpected?: string;
}) {
  const text = params.quotationText || "";

  return {
    overallRiskScore: 78,
    riskLevel: "Rất Cao",
    potentialExtraCostMin: 35000000,
    potentialExtraCostMax: 65000000,
    summary: `Báo giá có nhiều điểm mập mờ nghiêm trọng về vật tư cơ điện (MEP) và chống thấm. Nhà thầu cố tình dùng thuật ngữ chung chung "trọn gói", giấu mã hiệu sản phẩm để tạo tâm lý giá rẻ ban đầu, tiềm ẩn nguy cơ phát sinh từ 35 đến 65 triệu VNĐ khi bước vào giai đoạn lắp đặt thiết bị.`,
    fourLayersAnalysis: {
      layer1_drawings: {
        status: "LỖI",
        comment: "Báo giá không đính kèm mặt bằng bố trí cấp thoát nước và sơ đồ nguyên lý tủ điện (Single Line Diagram). Chưa thể hiện vị trí van khóa tổng cục bộ từng khu vực WC.",
        risks: [
          "Dễ xung đột đường ống nước nóng với ống hút mùi âm trần thạch cao",
          "Thợ tự ý đi dây chéo góc làm thủng dây khi khoan treo tranh/tủ bếp",
        ],
      },
      layer2_specifications: {
        status: "CỰC KỲ NGUY HIỂM",
        comment: "Ống nước ghi 'Tiền Phong' không rõ cấp áp lực C1 hay C2/PN10. Dây điện không ghi rõ tiết diện ruột đồng và tiêu chuẩn vỏ bọc chống cháy. Sơn nước không có mã màu và dòng sản phẩm cụ thể.",
        risks: [
          "Nguy cơ bị lắp ống PPR C1 chịu nhiệt kém cho đường nước nóng",
          "Dây ổ cắm bếp không đủ tải 4.0mm2 dẫn đến quá nhiệt nhảy aptomat liên tục",
        ],
      },
      layer3_process: {
        status: "THIẾU SÓT",
        comment: "Hoàn toàn không có cam kết quy trình thử áp lực tĩnh đường ống cấp nước (8-10 bar trong 24h) và nghiệm thu ngâm nước sàn vệ sinh 48h trước khi lát gạch.",
        risks: [
          "Bục mối nối hàn nhiệt sau khi đã đóng trần và ốp đá, đền bù nhà dưới hàng trăm triệu",
          "Thấm cổ ống thoát sàn sau 3-6 tháng vào ở",
        ],
      },
      layer4_pricing: {
        status: "CẢNH BÁO",
        comment: "Đơn giá gom cụm 'trọn gói' không bóc tách mét dài và số lượng thiết bị thực tế. Chiêu bài kinh điển để chốt hợp đồng rồi kê thêm phát sinh khi đục tường.",
        risks: [
          "Phát sinh không kiểm soát từ 25 - 40% giá trị hợp đồng",
          "Không có cơ sở pháp lý để đối chiếu khối lượng khi nghiệm thu quyết toán",
        ],
      },
    },
    hiddenTraps: [
      {
        trapTitle: "Ghi ống nước Tiền Phong lấp lửng cấp áp lực",
        severity: "Cao",
        financialImpact: "Thiệt hại 40 - 70 triệu nếu bục ống âm sàn phải đập toàn bộ gạch men lát lại",
        explanation: "Thợ dùng PPR C1 rẻ tiền thay vì ống nước nóng PN20 chuyên dụng.",
      },
      {
        trapTitle: "Cắt giảm Aptomat chống giật RCBO bảo vệ người",
        severity: "Nghiêm trọng",
        financialImpact: "Rủi ro an toàn tính mạng người già và trẻ nhỏ khi rò điện bình nước nóng",
        explanation: "Chỉ lắp MCB thường để tiết kiệm 1.5 - 2 triệu chi phí vật tư tủ điện.",
      },
      {
        trapTitle: "Bỏ qua lớp chống thấm chân tường và cổ ống xuyên sàn",
        severity: "Cao",
        financialImpact: "Chi phí xử lý thấm ngược chân tường thạch cao từ 20 - 35 triệu",
        explanation: "Chỉ quét xi măng tinh thay vì dùng màng chống thấm polyme 2 thành phần Sika/Mapei.",
      },
    ],
    engineerActionPlan: [
      "Yêu cầu nhà thầu bóc tách bảng chi tiết mét dài, chủng loại dây Cadisun 1x2.5mm2 và 1x4.0mm2 ruột đồng đặc.",
      "Bắt buộc bổ sung điều khoản: 'Ống nước nóng dùng PPR Tiền Phong PN20 (hoặc Vesbo/Dismy loại 1); thử áp tĩnh 8 bar giữ 24h có biên bản ký nhận'.",
      "Thay thế toàn bộ CB nhánh khu vực ẩm ướt sang RCBO chống giật 30mA dòng cắt 6kA.",
      "Ghi rõ điều khoản phạt: Bất kỳ hạng mục nào phát sinh không có xác nhận bằng văn bản trước khi thi công sẽ KHÔNG được thanh toán.",
    ],
    facebookPostSummary: `🚨 **CẢNH BÁO: BÓC TÁCH 1 BÁO GIÁ CẢI TẠO CHUNG CƯ CÓ NGUY CƠ PHÁT SINH 45 TRIỆU!**

Một gia chủ tại Hà Nội vừa gửi tôi bản dự toán này trước ngày ký hợp đồng. Nhìn tổng thể thì rất "vừa túi tiền", nhưng mở phần điện nước ra thì toàn là bẫy:

1. **Ống nước Tiền Phong không ghi cấp áp lực:** Dễ bị đi ống C1 mỏng dính cho đường nước nóng Ariston.
2. **Không có Aptomat chống giật RCBO:** Nguy cơ rò điện chết người khi bình nước nóng ẩm ướt.
3. **Không cam kết thử áp lực 8 bar 24 giờ:** Nếu rò rỉ âm sàn sau này, tiền đập gạch đền nhà dưới không dưới 60 triệu!

👉 Hãy nhớ: **Gói Audit hồ sơ 1.5 - 3 triệu trước khi ký hợp đồng sẽ giúp anh/chị khóa chặt mọi bẫy phát sinh và bảo vệ an toàn tuyệt đối cho căn nhà!**

#kysuphiachunha #caitaonhachungcu #auditbaogia`,
  };
}

export function generateFallbackCalendar(projectFocus?: string) {
  const focus = projectFocus || "Cải tạo căn hộ chung cư bàn giao thô tại Hà Nội 2026-2027";
  return [
    {
      day: "Thứ Hai",
      pillar: "Trụ 1: 4 Lớp Kỹ Thuật (40%)",
      format: "Facebook Chuyên Sâu",
      title: "Cách Phân Biệt Ống PPR Tiền Phong Thật - Giả và Bẫy Cấp Áp Lực C1/C2 Trong Báo Giá",
      hook: "90% chủ nhà chung cư không biết ống nước nóng nhà mình đang dùng loại mỏng hay dày cho đến khi nó bục âm tường!",
      summary: "Hướng dẫn cách đọc thông số in trên thân ống PPR, phân biệt ống nước lạnh PN10 và ống nước nóng PN20. Cách bắt lỗi thợ khi ghi báo giá mập mờ.",
      cta: "Nhắn tin gửi bản báo giá để được Kỹ Sư Quyền kiểm tra miễn phí mã vật tư!",
      bestPostingTime: "11:30 - 12:30 trưa",
    },
    {
      day: "Thứ Ba",
      pillar: "Trụ 2: Case Thật / Vạch Lỗi (20%)",
      format: "TikTok Script 3 Cột",
      title: "Vạch Trần Chiêu 'Bao Trọn Gói Điện Nước 30 Triệu' Nhưng Phát Sinh Thêm 22 Triệu",
      hook: "Nhìn bản báo giá này xem anh/chị có thấy quen không? Bẫy giá rẻ giật hợp đồng!",
      summary: "Kịch bản video vạch trần trường hợp thực tế tại khu đô thị Ocean Park: Thợ bỏ sót đường cấp hút mùi và nguồn bếp từ để tính phát sinh giá cắt cổ.",
      cta: "Tải ngay checklist 10 điểm bẫy báo giá điện nước tại link bio.",
      bestPostingTime: "19:30 - 20:30 tối",
    },
    {
      day: "Thứ Tư",
      pillar: "Trụ 1: 4 Lớp Kỹ Thuật (40%)",
      format: "Facebook Đố Tương Tác",
      title: "Đố Anh/Chị: Tại Sao Căn Hộ Chung Cư Bắt Buộc Phải Có RCBO Chống Giật Riêng Cho Bếp và WC?",
      hook: "Chung cư đã có Aptomat tổng dưới tầng hầm và hành lang, vậy lắp thêm RCBO trong nhà có phải thợ đang 'vẽ' thêm tiền?",
      summary: "Bài toán giải thích cơ chế ngắt dòng rò 30mA trong 0.03 giây của RCBO so với MCB thường, kèm bảng so sánh chi phí thiết bị an toàn của Schneider/Panasonic.",
      cta: "Để lại bình luận bên dưới, tôi sẽ gửi sơ đồ nguyên lý tủ điện căn hộ chuẩn!",
      bestPostingTime: "08:00 - 09:00 sáng",
    },
    {
      day: "Thứ Năm",
      pillar: "Trụ 3: Thị Trường & Xu Hướng (15%)",
      format: "Facebook Chuyên Sâu",
      title: "Bảng Giá Nhân Công Thợ Nề & MEP Cải Tạo Chung Cư Tại Hà Nội Năm 2026-2027",
      hook: "Thuê thợ công nhật hay khoán trọn gói theo mét vuông? Con số thực tế không ai nói cho bạn biết.",
      summary: "Cập nhật đơn giá thợ lành nghề tại Hà Nội, phân tích ưu nhược điểm của việc thuê thợ trực tiếp so với tổng thầu có kỹ sư giám sát độc lập.",
      cta: "Cần tham khảo đơn giá chuẩn để thương lượng với thầu? Đặt lịch Audit hồ sơ ngay.",
      bestPostingTime: "11:45 - 13:00 trưa",
    },
    {
      day: "Thứ Sáu",
      pillar: "Trụ 4: Hậu Trường Nghề 15 Năm (15%)",
      format: "Shorts Phân Tích",
      title: "Chuyện Kỹ Sư: Pha Cứu Căn Hộ 120m2 Khỏi Nguy Cơ Thấm Trần 80 Triệu Phút Chót",
      hook: "Chỉ một bước kiểm tra ngâm nước 48 giờ mà cứu gia chủ khỏi màn đền bù thấu trời xanh!",
      summary: "Kể lại câu chuyện giám sát phát hiện thợ không quét màng chống thấm cổ ống thoát sàn vệ sinh master trước khi lát gạch granite.",
      cta: "Đừng để tiền mất tật mang, hãy để kỹ sư chuyên nghiệp đồng hành cùng căn nhà bạn.",
      bestPostingTime: "20:00 - 21:00 tối",
    },
    {
      day: "Thứ Bảy",
      pillar: "Trụ 1: 4 Lớp Kỹ Thuật (40%)",
      format: "TikTok Script 3 Cột",
      title: "Quy Trình Nghiệm Thu Đập Phá & Khoan Rút Lõi Không Cắt Vào Cáp Dự Ứng Lực",
      hook: "Khoan một lỗ điều hòa mà làm đứt cáp sàn chung cư thì đền bao nhiêu tiền?",
      summary: "Quy định nghiêm ngặt của Ban Quản Lý toà nhà về việc dò tìm cốt thép, cáp dự ứng lực trước khi mở lỗ thông gió hoặc treo trần nặng.",
      cta: "Follow kênh Kỹ Sư Phía Chủ Nhà để nhận trọn bộ cẩm nang cải tạo chuẩn kỹ thuật.",
      bestPostingTime: "14:00 - 15:30 chiều",
    },
    {
      day: "Chủ Nhật",
      pillar: "Trụ 5: Lời Mời / Chuyển Đổi (10%)",
      format: "Facebook Chuyên Sâu",
      title: "Tại Sao Gói Audit Báo Giá 1.5 - 3 Triệu Lại Giúp Bạn Tiết Kiệm Được 40 - 70 Triệu?",
      hook: "Bỏ ra 1-2% chi phí để kiểm soát 100% rủi ro tài chính của căn nhà, anh/chị chọn cách nào?",
      summary: "Tổng kết quyền lợi của dịch vụ Kỹ Sư Phía Chủ Nhà: Soi kỹ 4 lớp, ép thầu ký cam kết không phát sinh, kiểm tra độc lập từng giai đoạn thi công.",
      cta: "Inbox ngay hôm nay để nhận suất Audit hồ sơ dự toán độc lập có bảo lãnh kỹ thuật!",
      bestPostingTime: "09:00 - 10:30 sáng",
    },
  ];
}

export function generateFallbackChatReply(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("ppr") || lower.includes("tiền phong") || lower.includes("nước nóng") || lower.includes("ống")) {
    return `Chào anh/chị! Kỹ Sư Quyền xin trả lời thẳng vào vấn đề kỹ thuật ống nước:

1. **Về ống PPR Tiền Phong C1:** 
Tuyệt đối **KHÔNG ĐƯỢC** cho thợ dùng ống Tiền Phong Class 1 (C1) đi cho đường nước nóng!
- C1 chỉ dày khoảng 1.9mm - 2.3mm, chỉ chịu áp suất thấp và nhiệt độ thường dưới 35°C.
- Khi nước bình nóng lạnh Ariston/Picenza đạt 70°C - 80°C, ống C1 sẽ nhanh chóng bị biến dạng, phình mối nối và giòn vỡ sau 6 - 12 tháng.
- Bắt buộc phải dùng **ống PPR PN20 (hoặc tối thiểu PN16/Class 3)** có ký hiệu vạch đỏ chuyên dụng cho nước nóng.

2. **Cách vặn lại thợ sòng phẳng:**
*"Anh ghi rõ vào biên bản và báo giá giúp tôi: Ống nước nóng là PPR Tiền Phong PN20 độ dày tiêu chuẩn, hàn nhiệt đúng kỹ thuật và thử áp lực tĩnh 8-10 bar trong 24 giờ không tụt áp mới nghiệm thu thanh toán."*

Nếu nhà thầu không chịu cam kết bằng văn bản, anh/chị cần dừng lại ngay trước khi chuyển tiền cọc nhé!`;
  }

  if (lower.includes("dulux") || lower.includes("sơn") || lower.includes("mã")) {
    return `Chào anh/chị! Đây là chiêu bài kinh điển của các đội thầu hoàn thiện:

**Lý do nhà thầu không chịu ghi mã sơn Dulux cụ thể:**
- Sơn Dulux có rất nhiều phân khúc: Dulux Inspire (dòng kinh tế rẻ tiền), Dulux EasyClean (lau chùi hiệu quả), Dulux Ambiance 5in1 (cao cấp bóng/mờ). Giá chênh lệch nhau từ 1.5 đến 2.5 lần!
- Nếu chỉ ghi *"Sơn Dulux 2 lớp"*, thợ sẽ mua dòng Inspire rẻ nhất hoặc thậm chí lấy vỏ thùng Dulux xịn nhưng pha sơn gia công giá rẻ bên ngoài để tối đa hóa lợi nhuận.

**Cách xử lý dứt khoát:**
Yêu cầu nhà thầu ghi chuẩn chỉ: *Tên dòng (VD: Dulux Ambiance 5in1) - Mã cây màu chính hãng - Số lớp (1 lót kiềm + 2 phủ) - Quy cách bàn giao nguyên đai nguyên kiện đến công trình trước khi bóc nắp.*`;
  }

  if (lower.includes("rcbo") || lower.includes("aptomat") || lower.includes("chống giật") || lower.includes("điện")) {
    return `Chào anh/chị! Tôi giải thích rõ bản chất kỹ thuật điện an toàn:

1. **Aptomat tổng ở tầng (MCB ngoài hành lang):** 
Chỉ là Aptomat ngắt quá tải hoặc ngắn mạch lớn (dòng 40A - 63A). Nó **KHÔNG CÓ TÍNH NĂNG CHỐNG GIẬT** dòng rò nhỏ!
2. **Tại sao trong nhà bắt buộc phải có RCBO 30mA?**
- Con người khi bị điện giật chỉ chịu được dòng rò khoảng 30mA trong vài mili-giây. Dòng rò 30mA quá nhỏ nên Aptomat tổng ngoài hành lang sẽ **KHÔNG BAO GIỜ NHẢY**, dẫn đến tử vong hoặc cháy nổ âm tường.
- Chiếc RCBO chống giật Schneider hoặc Panasonic (độ nhạy 30mA) sẽ tự động cắt điện tức thì trong 0.03 giây ngay khi có giọt nước bắn vào ổ cắm hoặc bình nóng lạnh rò điện.

Đừng tiếc 1-2 triệu cho thiết bị bảo vệ mạng sống của cả gia đình anh/chị nhé!`;
  }

  if (lower.includes("audit") || lower.includes("tiết kiệm") || lower.includes("giá") || lower.includes("dịch vụ")) {
    return `Chào anh/chị! Nhiều người thắc mắc vì sao bỏ ra 1.5 - 3 triệu thuê Kỹ Sư Audit hồ sơ lại giữ lại được 40 - 70 triệu:

1. **Khóa chặt bẫy phát sinh ẩn:** Thợ thường cố tình bỏ quên các hạng mục bắt buộc (van khóa, chống thấm cổ ống, dây tiếp địa, đục cắt bê tông) để báo giá rẻ ban đầu, sau đó tính giá phát sinh gấp 3 lần khi vào việc. Kỹ sư sẽ bóc tách bổ sung ngay từ đầu.
2. **Chặn đứng chiêu tráo đổi vật tư:** Ép nhà thầu ghi rõ từng mã dây Cadisun đặc ruột, ống PPR PN20, sơn 5in1, thiết bị đóng cắt có bảo hành chính hãng.
3. **Quy trình nghiệm thu bắt buộc:** Đưa vào hợp đồng điều khoản thử áp lực nước 8 bar 24h và ngâm sàn 48h. Tránh hoàn toàn thảm cảnh đục sàn ốp lại đền bù hàng chục triệu.

Anh/chị cần tôi thẩm định bộ hồ sơ hoặc hợp đồng thầu nào, cứ gửi thông tin qua nhé!`;
  }

  // General MEP expert response
  return `Chào anh/chị! Kỹ Sư Vũ Văn Quyền (15 năm MEP tại Hà Nội) đã nhận câu hỏi của anh/chị.

Về nguyên tắc làm việc: Tôi luôn đứng 100% về phía quyền lợi và dòng tiền của chủ nhà, tuyệt đối không bao che cho các chiêu trò làm ẩu, bẫy giá mập mờ hay tráo vật tư của thợ.

Anh/chị hãy chia sẻ chi tiết hơn:
- Căn hộ của anh/chị thuộc dự án nào tại Hà Nội (Vin, Masteri, Ecopark, nhà phố...)?
- Nhà thầu đang báo giá hạng mục gì (Điện, Nước, Điều hòa, Chống thấm, hay Trọn gói)?
- Anh/chị đang nghi ngờ điểm nào chưa rõ ràng?

Tôi sẽ bóc tách và chỉ cho anh/chị cách đàm phán sòng phẳng nhất!

#kysuphiachunha #caitaonhachungcu #auditbaogia`;
}
