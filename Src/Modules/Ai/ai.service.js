import { GoogleGenerativeAI } from "@google/generative-ai";

export const chat = async (req, res) => {
    
        // 1. استقبال البيانات
        const { message } = req.body;
        const files = req.files || [];

        // 2. إعداد Gemini
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // 🛑 تصحيح 1: اسم الموديل كان غلط، الصح هو gemini-1.5-flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const parts = []; // هنسميها parts عشان ده الاسم القياسي

        // 🛑 تصحيح 2: اللوب لازم يكون على files مش data
        if (files.length > 0) {
            files.forEach((file) => {
                if (file.buffer) {
                    parts.push({
                        inlineData: {
                            data: file.buffer.toString("base64"),
                            mimeType: file.mimetype,
                        },
                    });
                }
            });
        }

        // إضافة الرسالة النصية
        if (message) {
            parts.push({ text: message });
        } else if (files.length > 0) {
            parts.push({ text: "شرح للصورة" });
        }

        // 🛑 تصحيح 3: الدالة الصح هي generateContent مش predict
        const result = await model.generateContent(parts);
        const response = await result.response;
        
        // استخراج النص من الرد
        const textResponse = response.text();

        return res.status(200).json({
            success: true, 
            message: "success chat", 
            result: textResponse 
        });
      }