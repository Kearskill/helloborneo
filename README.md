# Hello Borneo - Increasing Adoption of TnG in East Malaysia

## Team Name
Hello Borneo

## Project Name
Increasing Adoption of TnG in East Malaysia

## Description
**Track submitted:** theme(financial inclusion)

This project aims to increase the adoption of the Touch 'n Go (TnG) eWallet in East Malaysia (Sabah and Sarawak) by addressing the barriers to financial inclusion. We focus on accessibility through local language support and a voice-guided interface, making digital payments more intuitive for diverse communities, including those in rural areas.

## Implementation

### Core Features
- **Multi-Language Support:** Localized interface and voice support for English, Bahasa Melayu, **Iban**, and **Dusun/Kadazan**.
- **Voice Assistant:** An integrated voice interface that allows users to perform financial tasks through natural language.
- **AI-Driven Intent Recognition:** Uses AI to understand user requests in local dialects and translate them into actionable app commands.
- **Guided Transactions:** Step-by-step visual and voice guidance for transfers, QR scans, and bill payments.

### Tech Stack
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript.
- **Styling & UI:**
  - **Tailwind CSS** for responsive design.
  - **Shadcn UI (Radix UI)** for accessible, high-quality components.
  - **Framer Motion** for smooth, interactive animations.
  - **Lucide React** for consistent iconography.
- **Backend & Services:**
  - **Next.js Server Actions** for secure, server-side logic.
  - **AWS Polly** for high-quality text-to-speech synthesis in multiple languages.
  - **Alibaba Qwen AI (qwen-plus)** for advanced linguistic analysis and intent classification.
- **State Management:** React Context API for language and guidance flow management.

### How it Works
1. **Linguistic Analysis:** The app uses the Qwen AI model to classify user intent from voice or text input, specifically trained to recognize local East Malaysian languages.
2. **Contextual Guidance:** Based on the identified intent (e.g., "Transfer money to John"), the app initiates a guided flow using `GuideContext`.
3. **Voice Feedback:** AWS Polly generates audio responses. For languages like Iban and Kadazan/Dusun, the system uses custom **Lexicons** to ensure accurate pronunciation and natural-sounding speech, even for dialects not natively supported by standard TTS engines.
