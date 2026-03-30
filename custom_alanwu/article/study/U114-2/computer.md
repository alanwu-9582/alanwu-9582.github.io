<!-- title: 人工智慧導論與計算機程式  -->
<!-- description: 金童老師證照題庫部分題目詳解 -->
<!-- category: Study -->
<!-- tags: computer -->
<!-- published time: 2026/3/30 -->

# 人工智慧導論與計算機程式
## 證照題庫部分題目詳解
金童老師沒用證照給的題庫都沒詳解，助教題目答案念一遍根本拉完了。
### 001~020題
- 10. 以下哪種模型專注於生成圖像內容？
    * (1)GPT
    * (2)VAE
    * (3)GAN
    * (4)RNN

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (3) GAN </span><br>
    <span>(1) GPT 是自然語言處理模型，專注於生成文本內容。</span><br>
    <span>(2) VAE 是變分自編碼器，主要用於生成數據分布的模型。</span><br>
    <span>(3) GAN 是生成對抗網絡，專注於生成圖像內容</span><br>
    <span>(4) RNN 是循環神經網絡，主要用於處理序列數據，如文本或時間序列。</span><br>
    </details>

- 13. 下列哪一項描述最符合擴散模型（Diffusion Model）的運作流程？
    * (1)以分類方式選擇最佳答案
    * (2)根據圖像標籤進行分析
    * (3)以單一神經網路預測輸出
    * (4)逐步將噪聲還原為清晰圖像。
    
    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (4) 逐步將噪聲還原為清晰圖像。</span><br>
    <span>(1) 以分類方式選擇最佳答案是分類模型的運作方式，不適用於擴散模型。</span><br>
    <span>(2) 根據圖像標籤進行分析是監督式學習的特徵，不適用於擴散模型。</span><br>
    <span>(3) 以單一神經網路預測輸出是一般神經網路的運作方式，不適用於擴散模型。</span><br>
    </details>
    
- 14. 哪一種生成式人工智慧模型最常應用於語音合成？
    * (1)GAN
    * (2)Transformer
    * (3)CNN
    * (4)Autoencoder

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (2) Transformer </span><br>
    <span>(1) GAN 主要用於圖像生成</span><br>
    <span>(3) CNN 主要用於圖像處理</span><br>
    <span>(4) Autoencoder 是一種無監督學習模型，主要用於數據壓縮和特徵提取</span><br>
    </details>

- 16. 為提升生成式人工智慧模型的穩定性與準確性，訓練時應注意下列哪項？
    * (1)減少資料量
    * (2)避免使用測試集
    * (3)調整學習率與參數
    * (4)降低模型複雜度

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (3) 調整學習率與參數 </span><br>
    <span>(1) 減少資料量可能導致模型過擬合，降低模型的泛化能力。</span><br>
    <span>(2) 避免使用測試集會使模型無法評估其性能，無法確保模型的準確性和穩定性。</span><br>
    <span>(4) 降低模型複雜度可能會導致模型無法捕捉數據中的複雜模式，降低模型的表現能力。</span><br>
    </details>

- 19. 生成式人工智慧模型 GPT 最早由哪個組織開發？ 
    * (1)Google
    * (2)OpenAI
    * (3)Facebook AI
    * (4)MIT。

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (2) OpenAI </span><br>
    </details>

### 021~040題
- 25. 在生成式模型評估中，常用來衡量文本生成質量的指標是哪一個？
    * (1)BLEU
    * (2)ROUGE
    * (3)IoU
    * (4)PSNR。

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (1) BLEU </span><br>
    <span>(1) BLEU 雙語評估互補，常用於評估機器翻譯和文本生成品質。</span><br>
    <span>(2) ROUGE 自動文本摘要，是一種評估文本摘要質量的指標。</span><br>
    <span>(3) IoU 交集與聯集之比，常用於圖像分割任務。</span><br>
    <span>(4) PSNR 峰值信噪比，常用於圖像和視頻品質評估。</span><br>
    </details>

- 29. 生成式 AI 在商業應用中，以下哪一項最常見？
    * (1)資料庫備份
    * (2)自動化內容創作
    * (3)硬體故障檢測
    * (4)線性回歸分析。

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (2) 自動化內容創作 </span><br>
    <span>(1) 資料庫備份通常由專門的備份工具處理</span><br>
    <span>(3) 硬體故障檢測通常由監控系統和診斷工具處理</span><br>
    <span>(4) 線性回歸分析是統計學和機器學習中的一種方法</span><br>
    </details>

- 30. 以下哪種方法可用於減少生成式模型的偏見與歧視？
    * (1)提高模型容量 
    * (2)僅使用無標籤資料 
    * (3)對訓練數據進行公平性調整 
    * (4)減少訓練次數

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (3) 對訓練數據進行公平性調整 </span><br>
    <span>(1) 提高模型容量可能會增加模型的表現能力，但不一定能減少偏見與歧視。</span><br>
    <span>(2) 無標籤資料可能會導致模型無法學習到有用的特徵</span><br>
    <span>(4) 減少訓練次數可能會導致模型無法充分學習</span><br>
    </details>

- 33. 哪一個生成式模型是由 Ian Goodfellow 等人在 2014 年提出的？
    * (1)VAE
    * (2)GAN
    * (3)LSTM
    * (4)Transformer

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (2) GAN </span><br>
    <span>(1) VAE 是由 Kingma 和 Welling 在 2013 年提出的變分自編碼器。</span><br>
    <span>(3) LSTM 是由 Hochreiter 和 Schmidhuber 在 1997 年提出的長短期記憶網絡。</span><br>
    <span>(4) Transformer 是由 Vaswani 等人在 2017 年提出的基於注意力機制的模型。</span><br>
    </details>

- 38. 哪一個模型在生成長篇連貫的文本方面展現出色？
    * (1)GPT-1
    * (2)GPT-2
    * (3)VAE
    * (4)HMM。 

    <details class="custom-strong">
    <summary>詳解</summary>
    <span>答案： (2) GPT-2 </span><br>
    <span>(1) GPT-1 在生成長篇連貫文本方面不如 GPT-2。</span><br>
    <span>(3) VAE 主要用於生成數據分布的模型</span><br>
    <span>(4) HMM 隱馬爾可夫模型，主要用於序列數據的建模</span><br>
    </details>