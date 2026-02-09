export const PROJECT_ASSETS: Record<
  string,
  Array<{ images?: string[]; image?: string; link?: string }>
> = {
  "poc-mvp": [
    { images: ["/img/poc-mvp/agent-smith-1.png", "/img/poc-mvp/agent-smith-2.png"], link: "https://agentsmith.world" },
    { images: ["/img/poc-mvp/property-mgnt-1.png", "/img/poc-mvp/property-mgnt-2.png"] },
    { images: ["/img/poc-mvp/night-club-1.png", "/img/poc-mvp/night-club-2.png", "/img/poc-mvp/night-club-3.png"] },
  ],
  saas: [
    { images: ["/img/sass/hollynest%20(1).png", "/img/sass/hollynest%20(2).png", "/img/sass/hollynest%20(3).png"], link: "https://hollynest.com" },
    { images: ["/img/sass/paperclue%20(1).png", "/img/sass/paperclue%20(2).png", "/img/sass/paperclue%20(3).png"], link: "https://paperclue.ai" },
    { images: ["/img/sass/suisei%20(1).png", "/img/sass/suisei%20(2).png"], link: "https://suisei.ai" },
    { images: ["/img/sass/ashpos%20(1).png", "/img/sass/ashpos%20(2).png", "/img/sass/ashpos%20(3).png", "/img/sass/ashpos%20(4).png"], link: "https://ashespos.ai" },
    { images: ["/img/sass/voice-agent%20(1).png", "/img/sass/voice-agent%20(2).png", "/img/sass/voice-agent%20(3).png", "/img/sass/voice-agent%20(4).png"], link: "https://qcall.ai" },
  ],
  "ml-solutions": [
    { image: "/img/mlops/rakuten-ecommerce.png" },
    { image: "/img/mlops/time-series-forecasting.png" },
    { image: "/img/mlops/sales-prediction.png" },
    { image: "/img/mlops/sentiment-analysis.png" },
    { image: "/img/mlops/travel-recommendation.png" },
  ],
  automation: [
    { image: "/img/automation/openai-transcribe.png" },
    { images: ["/img/automation/n8n-rag/RAG_workflow.png", "/img/automation/n8n-rag/screenshot_20250422_201446.png", "/img/automation/n8n-rag/screenshot_20250422_201601.png"] },
    { image: "/img/automation/document-processing.png" },
  ],
  "web-mobile": [
    { images: ["/img/web-mobile/design-library%20(1).png", "/img/web-mobile/design-library%20(2).png"], link: "https://design-library.jp/topic/spring" },
    { images: ["/img/web-mobile/taprize%20(1).png", "/img/web-mobile/taprize%20(2).png"], link: "https://taprize.jp/" },
    { images: ["/img/web-mobile/klook%20(1).png", "/img/web-mobile/klook%20(2%20).png", "/img/web-mobile/klook%20(3).png"], link: "https://www.klook.com/" },
  ],
  devops: [
    { image: "/img/devops/aws-automation.png" },
    { image: "/img/devops/llm_ops.png" },
  ],
}
