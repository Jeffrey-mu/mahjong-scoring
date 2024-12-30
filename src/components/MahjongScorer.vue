<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2 sm:p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header - 优化质感 -->
      <div class="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-3 sm:p-4 mb-4 sm:mb-8">
        <div class="flex justify-between items-center mb-3">
          <h1 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_3px_rgba(234,179,8,0.3)]">
            麻将记分
          </h1>
          <div class="flex gap-1 sm:gap-2">
            <button 
              @click="showSettings = true"
              class="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 
                     bg-gradient-to-r from-gray-800/80 to-gray-700/80 
                     hover:from-gray-700/80 hover:to-gray-600/80
                     border border-white/10 rounded-lg transition-all duration-200
                     shadow-[0_0_15px_rgba(255,255,255,0.1)]
                     hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]
                     active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg>
              <span class="hidden sm:inline ml-1 text-white/90">设置</span>
            </button>
            <button 
              @click="exportData"
              class="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 
                     bg-gradient-to-r from-indigo-600/90 to-indigo-500/90
                     hover:from-indigo-500/90 hover:to-indigo-400/90
                     border border-indigo-400/20 rounded-lg transition-all duration-200
                     shadow-[0_0_15px_rgba(99,102,241,0.3)]
                     hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]
                     active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span class="hidden sm:inline ml-1 text-white/90">导出</span>
            </button>
            <button 
              @click="resetScores"
              class="flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:px-3 sm:py-2 
                     bg-gradient-to-r from-amber-600/90 to-amber-500/90
                     hover:from-amber-500/90 hover:to-amber-400/90
                     border border-amber-400/20 rounded-lg transition-all duration-200
                     shadow-[0_0_15px_rgba(245,158,11,0.3)]
                     hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]
                     active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/90" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              <span class="hidden sm:inline ml-1 text-white/90">重置</span>
            </button>
          </div>
        </div>

        <!-- 基础信息展示 - 优化质感 -->
        <div class="grid grid-cols-2 sm:flex sm:items-center sm:justify-between text-xs sm:text-sm">
          <div class="flex flex-col sm:flex-row sm:gap-4">
            <span class="text-gray-300/90 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)]">基础分：{{ baseScore }}元</span>
            <span class="text-gray-300/90 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)]">庄家：{{ players[banker].name }}</span>
            <span class="text-gray-300/90 drop-shadow-[0_0_2px_rgba(255,255,255,0.1)]">轮庄：{{ autoCycleBanker ? '自动' : '手动' }}</span>
          </div>
          <div class="text-right sm:text-left">
            <span class="text-gray-300/90">第{{ history.length + 1 }}圈</span>
          </div>
        </div>
      </div>

      <!-- 玩家分数展示 - 优化质感 -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
        <div v-for="(player, index) in players" :key="index" 
             class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-3 sm:p-4 
                    text-center transform transition-all duration-300 hover:scale-102 active:scale-98 hover:bg-white/20
                    hover:shadow-[0_0_25px_rgba(255,255,255,0.1)]"
                 :class="{'ring-2 ring-yellow-400/80 shadow-[0_0_20px_rgba(234,179,8,0.2)]': index === banker}">
          <div class="flex items-center justify-center gap-1 mb-1">
            <h2 class="text-base sm:text-xl font-bold text-white/95 drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">
              {{ player.name }}
            </h2>
            <span v-if="index === banker" 
                  class="bg-gradient-to-r from-yellow-500/90 via-amber-500/90 to-yellow-500/90 text-white/95 
                         text-xs px-2 py-0.5 rounded-full border border-yellow-400/30
                         shadow-[0_0_10px_rgba(234,179,8,0.3)]">
              庄
            </span>
          </div>
          <p class="text-xl sm:text-2xl font-medium" 
             :class="player.score >= 0 
               ? 'text-emerald-400 drop-shadow-[0_0_3px_rgba(52,211,153,0.3)]' 
               : 'text-rose-400 drop-shadow-[0_0_3px_rgba(251,113,133,0.3)]'">
            {{ player.score }}
          </p>
        </div>
      </div>

      <!-- 牌桌设置模态框 -->
      <div v-if="showSettings" 
           class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-bold">牌桌设置</h3>
              <button 
                @click="showSettings = false"
                class="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-6">
              <!-- 玩家名称设置 -->
              <div>
                <label class="text-sm font-medium block mb-2">玩家名称</label>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div v-for="(player, index) in players" :key="index"
                       class="flex flex-col gap-1">
                    <label class="text-xs text-gray-500">{{ getDefaultName(index) }}</label>
                    <input 
                      type="text"
                      v-model="player.name"
                      class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-center"
                      :placeholder="getDefaultName(index)"
                    >
                  </div>
                </div>
              </div>

              <!-- 基础分设置 -->
              <div>
                <label class="text-sm font-medium block mb-2">基础分</label>
                <div class="flex items-center gap-4">
                  <input 
                    type="number"
                    v-model="baseScore"
                    class="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="设置基础分"
                  >
                  <span class="text-gray-600">当前：{{ baseScore }}元</span>
                </div>
              </div>

              <!-- 庄家设置 -->
              <div>
                <label class="text-sm font-medium block mb-2">庄家设置</label>
                <div class="space-y-3">
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <button 
                      v-for="(player, index) in players" 
                      :key="index"
                      @click="setBanker(index)"
                      class="px-4 py-2 rounded-lg"
                      :class="banker === index 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'"
                    >
                      {{ player.name }}
                    </button>
                  </div>
                  <label class="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      v-model="autoCycleBanker"
                      class="rounded text-blue-500"
                    >
                    <span class="text-sm">自动轮庄</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="mt-6 flex justify-end">
              <button 
                @click="showSettings = false"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 记分表单 - 优化质感 -->
      <div class="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-4 sm:p-6
                  hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
        <h3 class="text-base sm:text-lg font-bold text-white mb-4">记录分数</h3>
        
        <div class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
          <!-- 左侧：基本选择 -->
          <div class="space-y-4">
            <!-- 赢家选择 -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-300/90">赢家</label>
              <div class="grid grid-cols-4 gap-1 sm:gap-2">
                <button 
                  v-for="(player, index) in players" 
                  :key="index"
                  @click="selectWinner(index)"
                  class="px-2 py-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-all"
                  :class="selectedWinner === index 
                    ? 'bg-blue-500/80 text-white shadow-lg' 
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'"
                >
                  {{ player.name }}
                </button>
              </div>
            </div>

            <!-- 胡牌方式 -->
            <div v-if="selectedWinner !== null" class="space-y-2">
              <label class="block text-sm font-medium text-gray-300/90">胡牌方式</label>
              <div class="flex gap-2">
                <button 
                  @click="winType = 'dianpao'"
                  class="flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm transition-all"
                  :class="winType === 'dianpao' ? 'bg-blue-500/80 text-white shadow-lg' : 'bg-white/10 hover:bg-white/20 text-gray-300'"
                >
                  点炮
                </button>
                <button 
                  @click="winType = 'zimo'"
                  class="flex-1 px-3 py-2 rounded-lg text-xs sm:text-sm transition-all"
                  :class="winType === 'zimo' ? 'bg-blue-500/80 text-white shadow-lg' : 'bg-white/10 hover:bg-white/20 text-gray-300'"
                >
                  自摸
                </button>
              </div>
            </div>

            <!-- 点炮人选择 -->
            <div v-if="winType === 'dianpao'" class="space-y-2">
              <label class="block text-sm font-medium text-gray-300/90">点炮人</label>
              <div class="grid grid-cols-4 gap-1 sm:gap-2">
                <button 
                  v-for="(player, index) in players" 
                  :key="index"
                  @click="selectLoser(index)"
                  class="px-2 py-2 sm:px-3 rounded-lg text-xs sm:text-sm transition-all"
                  :class="[
                    index === selectedWinner ? 'opacity-50 cursor-not-allowed' : '',
                    selectedLoser === index 
                      ? 'bg-rose-500/80 text-white shadow-lg' 
                      : 'bg-white/10 hover:bg-white/20 text-gray-300'
                  ]"
                  :disabled="index === selectedWinner"
                >
                  {{ player.name }}
                </button>
              </div>
            </div>
          </div>

          <!-- 右侧：分数输入和预览 -->
          <div v-if="canInputScore" class="space-y-4">
            <!-- 分数输入 -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-300/90">赢分</label>
              <div class="space-y-4">
                <!-- 输入框和计算按钮 -->
                <div class="flex gap-2">
                  <input 
                    type="number"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    v-model="winAmount"
                    class="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg 
                           focus:ring-2 focus:ring-blue-500/50 text-sm text-white 
                           placeholder-gray-400/70"
                    placeholder="输入赢分"
                    style="-webkit-text-size-adjust: 100%; text-size-adjust: 100%;"
                  >
                  <button 
                    @click="calculateScores"
                    class="px-4 py-2 bg-gradient-to-r from-blue-600/90 to-blue-500/90
                           hover:from-blue-500/90 hover:to-blue-400/90
                           border border-blue-400/20 rounded-lg text-sm text-white/90
                           transition-all duration-200
                           shadow-[0_0_15px_rgba(59,130,246,0.3)]
                           hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
                           active:scale-95"
                  >
                    计算
                  </button>
                </div>

                <!-- 滑块器 -->
                <div class="space-y-2">
                  <div class="flex justify-between text-xs text-gray-400/90">
                    <span>0</span>
                    <span>{{ maxSliderValue }}</span>
                  </div>
                  <div class="relative group">
                    <input 
                      type="range"
                      v-model="winAmount"
                      :min="0"
                      :max="maxSliderValue"
                      step="5"
                      class="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer
                             focus:outline-none focus:ring-2 focus:ring-blue-500/50
                             [&::-webkit-slider-thumb]:appearance-none
                             [&::-webkit-slider-thumb]:w-6
                             [&::-webkit-slider-thumb]:h-6
                             [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-gradient-to-r
                             [&::-webkit-slider-thumb]:from-blue-500
                             [&::-webkit-slider-thumb]:to-blue-400
                             [&::-webkit-slider-thumb]:border
                             [&::-webkit-slider-thumb]:border-blue-400/20
                             [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(59,130,246,0.3)]
                             [&::-webkit-slider-thumb]:transition-all
                             [&::-webkit-slider-thumb]:hover:scale-110
                             group-hover:[&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    >
                    <!-- 当前值提示 -->
                    <div class="absolute -top-8 left-1/2 transform -translate-x-1/2
                                bg-blue-500/90 text-white/90 px-2 py-1 rounded text-xs
                                shadow-[0_0_10px_rgba(59,130,246,0.3)]
                                transition-opacity duration-200
                                opacity-0 group-hover:opacity-100">
                      {{ winAmount }}
                    </div>
                  </div>
                  <!-- 快速选择按钮 -->
                  <div class="flex gap-2 mt-2">
                    <button 
                      v-for="value in quickSelectValues"
                      :key="value"
                      @click="handleQuickSelect(value)"
                      class="flex-1 px-2 py-1 text-xs rounded-lg
                             bg-white/10 hover:bg-white/20 text-gray-300/90
                             transition-all duration-200
                             border border-white/10
                             hover:border-white/20"
                    >
                      {{ value }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分数预览 -->
            <div v-if="previewScores.length > 0" class="space-y-3">
              <label class="block text-sm font-medium text-gray-300/90">分数预览</label>
              <div class="flex flex-wrap gap-2">
                <div v-for="(score, index) in previewScores" :key="index"
                     class="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 flex-1 min-w-[120px]">
                  <span class="text-sm text-gray-400">{{ players[index].name }}</span>
                  <span class="text-base font-medium ml-auto"
                        :class="score >= 0 
                          ? 'text-emerald-400 drop-shadow-[0_0_2px_rgba(52,211,153,0.2)]' 
                          : 'text-rose-400 drop-shadow-[0_0_2px_rgba(251,113,133,0.2)]'">
                    {{ score >= 0 ? '+' + score : score }}
                  </span>
                </div>
              </div>
              <button 
                @click="recordScores"
                class="w-full bg-gradient-to-r from-emerald-600/90 to-emerald-500/90
                       hover:from-emerald-500/90 hover:to-emerald-400/90
                       border border-emerald-400/20 rounded-lg text-white/90 px-4 py-2
                       transition-all duration-200
                       shadow-[0_0_15px_rgba(16,185,129,0.3)]
                       hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]
                       active:scale-95"
              >
                确认记录
              </button>
            </div>

            <p class="text-xs sm:text-sm text-gray-400/90">
              庄家{{ selectedWinner === banker ? '赢' : '输' }}分将额外{{ selectedWinner === banker ? '得到' : '扣除' }}基础分({{ baseScore }}元)
            </p>
          </div>
        </div>
      </div>

      <!-- 历史记录 - 优化质感 -->
      <div class="mt-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl p-4 sm:p-6
                  hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
        <h3 class="text-lg font-bold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
          历史记录
        </h3>
        <div class="space-y-4">
          <div v-for="(record, index) in history" :key="index" 
               class="bg-white/5 border border-white/10 rounded-lg p-4 
                      transition-all duration-300 hover:bg-white/10
                      hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div class="flex justify-between items-center mb-2">
              <div class="text-sm text-gray-400/90">
                第{{ history.length - index }}圈 | {{ record.time }}
              </div>
              <div class="text-sm">
                <span class="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-400/20">
                  庄家：{{ record.banker }}
                </span>
              </div>
            </div>
            <div class="mb-2 text-sm">
              <span class="text-blue-400/95">{{ record.winner }}</span>
              <span class="mx-1 text-gray-300/90">{{ record.winType === 'zimo' ? '自摸' : '胡' }}</span>
              <span v-if="record.winType === 'dianpao'" class="text-rose-400/95">
                {{ record.loser }} 点炮
              </span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div v-for="(score, playerIndex) in record.scores" :key="playerIndex" 
                   class="flex items-center justify-between sm:justify-start gap-2 bg-white/5 rounded-lg p-2">
                <span class="text-gray-400/90">{{ players[playerIndex].name }}</span>
                <span :class="score >= 0 
                  ? 'text-emerald-400/95 drop-shadow-[0_0_2px_rgba(52,211,153,0.2)]' 
                  : 'text-rose-400/95 drop-shadow-[0_0_2px_rgba(251,113,133,0.2)]'">
                  {{ score >= 0 ? '+' + score : score }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

type WinType = 'dianpao' | 'zimo' | null

interface Player {
  name: string
  score: number
}

interface Record {
  scores: number[]
  time: string
  winType: string
  winner: string
  loser: string
  banker: string
  baseScore: number
  round: number
}

// 从本地存储加载数据
const loadFromStorage = () => {
  try {
    const savedState = localStorage.getItem('mahjongState')
    if (savedState) {
      const state = JSON.parse(savedState)
      players.value = state.players
      banker.value = state.banker
      baseScore.value = state.baseScore
      history.value = state.history
      autoCycleBanker.value = state.autoCycleBanker ?? true
    }
  } catch (error) {
    console.error('Failed to load state from storage:', error)
  }
}

// 保存数据到本地存储
const saveToStorage = () => {
  try {
    const state = {
      players: players.value,
      banker: banker.value,
      baseScore: baseScore.value,
      history: history.value,
      autoCycleBanker: autoCycleBanker.value
    }
    localStorage.setItem('mahjongState', JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save state to storage:', error)
  }
}

// 初始化数据
const players = ref<Player[]>([
  { name: '东', score: 0 },
  { name: '南', score: 0 },
  { name: '西', score: 0 },
  { name: '北', score: 0 }
])

const baseScore = ref<number>(5)
const banker = ref<number>(0)
const selectedWinner = ref<number | null>(null)
const selectedLoser = ref<number | null>(null)
const winType = ref<WinType>(null)
const winAmount = ref<number>(0)
const previewScores = ref<number[]>([])
const history = ref<Record[]>([])
const showSettings = ref(false)
const autoCycleBanker = ref(true)

// 监听数据变化，自动保存
watch(
  [players, banker, baseScore, history],
  () => {
    saveToStorage()
  },
  { deep: true }
)

// 页面加载时恢复数据
loadFromStorage()

// 计算是否可以输入分数
const canInputScore = computed(() => {
  if (winType.value === 'dianpao') {
    return selectedWinner.value !== null && selectedLoser.value !== null
  }
  return winType.value === 'zimo' && selectedWinner.value !== null
})

const formatTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

const selectWinner = (index: number) => {
  selectedWinner.value = index
  selectedLoser.value = null
  winType.value = null
  previewScores.value = []
  winAmount.value = 0  // 重置赢分
}

const selectLoser = (index: number) => {
  if (index !== selectedWinner.value) {
    selectedLoser.value = index
    previewScores.value = []
    winAmount.value = 0  // 重置赢分
  }
}

// 设置庄家
const setBanker = (index: number) => {
  banker.value = index
}

const calculateScores = () => {
  if (selectedWinner.value === null || !winAmount.value) return
  
  // 确保使用数值类型
  const amount = Number(winAmount.value)
  if (isNaN(amount)) return

  if (winType.value === 'dianpao' && selectedLoser.value !== null) {
    // 点炮计分
    const winnerIsBanker = selectedWinner.value === banker.value
    const loserIsBanker = selectedLoser.value === banker.value
    
    let finalWinScore = amount
    let finalLoseScore = amount

    // 庄家点炮：输的钱需要加基础分
    if (loserIsBanker) {
      finalLoseScore += baseScore.value
      finalWinScore += baseScore.value  // 赢家也相应增加
    }
    // 庄家胡牌：赢的钱需要加基础分
    else if (winnerIsBanker) {
      finalWinScore += baseScore.value
      finalLoseScore += baseScore.value  // 点炮者也相应增加
    }
    
    previewScores.value = players.value.map((_, index) => {
      if (index === selectedWinner.value) return finalWinScore
      if (index === selectedLoser.value) return -finalLoseScore
      return 0
    })
  } else if (winType.value === 'zimo') {
    // 自摸计分
    const winnerIsBanker = selectedWinner.value === banker.value
    let totalWin = 0
    
    previewScores.value = players.value.map((_, index) => {
      if (index === selectedWinner.value) {
        return 0 // 先设为0，后面更新
      }
      
      let loseScore = amount
      // 如果庄家是输家或赢家，额外加上基础分
      if (index === banker.value || winnerIsBanker) {
        loseScore += baseScore.value
      }
      
      totalWin += loseScore
      return -loseScore
    })
    
    // 更新赢家分数
    previewScores.value[selectedWinner.value] = totalWin
  }
}

const recordScores = () => {
  if (previewScores.value.length === 0) return

  // 更新玩家分数
  players.value.forEach((player, index) => {
    player.score += previewScores.value[index]
  })

  // 添加到历史记录
  history.value.unshift({
    scores: [...previewScores.value],
    time: formatTime(),
    winType: winType.value as string,
    winner: players.value[selectedWinner.value!].name,
    loser: winType.value === 'dianpao' ? players.value[selectedLoser.value!].name : '自摸',
    banker: players.value[banker.value].name,
    baseScore: baseScore.value,
    round: history.value.length + 1
  })

  // 自动轮庄逻辑
  if (autoCycleBanker.value) {
    // 如果当前庄家胡牌（无论点炮还是自摸），庄家连庄
    if (selectedWinner.value !== banker.value) {
      // 不是庄家胡牌，庄家转移给下一位
      banker.value = (banker.value + 1) % players.value.length
    }
  }

  // 重置
  selectedWinner.value = null
  selectedLoser.value = null
  winType.value = null
  winAmount.value = 0
  previewScores.value = []
}

const resetScores = () => {
  if (confirm('确定要重置所有数据吗？这将清除所有历史记录。')) {
    // 只重置分数，保留名称
    players.value = players.value.map(player => ({
      name: player.name,  // 保留原有名称
      score: 0
    }))
    history.value = []
    selectedWinner.value = null
    selectedLoser.value = null
    winType.value = null
    winAmount.value = 0
    previewScores.value = []
    // 清除本地存储
    localStorage.removeItem('mahjongState')
    // 重置后立即保存当前状态到本地存储
    saveToStorage()
  }
}

// 添加导出功能
const exportData = () => {
  try {
    const data = {
      players: players.value,
      history: history.value,
      baseScore: baseScore.value,
      exportTime: new Date().toLocaleString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `麻将记分_${new Date().toLocaleDateString()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export data:', error)
    alert('导出数据失败')
  }
}

// 添加获取默认名称的函数
const getDefaultName = (index: number): string => {
  const defaultNames = ['东', '南', '西', '北']
  return defaultNames[index]
}

// 滑块最大值
const maxSliderValue = 100

// 快速选择值
const quickSelectValues = [5, 10, 20, 50]

// 监听 winAmount 变化，自动计算分数
watch(winAmount, (newValue) => {
  if (newValue && canInputScore.value) {
    // 确保转换为数值类型
    const amount = Number(newValue)
    if (!isNaN(amount)) {
      calculateScores()
    }
  }
})

// 修改快速选择按钮的点击处理
const handleQuickSelect = (value: number) => {
  winAmount.value = value
  calculateScores()
}
</script> 

<style>
.hover\:scale-102:hover {
  transform: scale(1.02);
}

/* 添加全局渐变动画 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-animate {
  background-size: 200% 200%;
  animation: gradient 15s ease infinite;
}

/* Firefox 滑块样式优化 */
input[type="range"]::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(to right, #2563eb, #3b82f6);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
  transition: all 0.2s;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
}

input[type="range"]::-moz-range-track {
  background: rgba(255, 255, 255, 0.1);
  height: 12px;
  border-radius: 6px;
}

/* 滑块轨道激活状态 */
input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(to right, 
    rgba(59, 130, 246, 0.5) var(--value-percent, 0%), 
    rgba(255, 255, 255, 0.1) var(--value-percent, 0%)
  );
  height: 12px;
  border-radius: 6px;
}

/* 增加滑块点击区域 */
input[type="range"] {
  padding: 8px 0;
  margin: -8px 0;
}

/* 禁止 iOS 上的字体大小自动调整 */
input[type="number"] {
  font-size: 16px !important;  /* 防止 iOS 缩放 */
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

/* 禁用输入框的默认样式 */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* 优化触摸体验 */
* {
  touch-action: manipulation;
}
</style> 
