<template>
  <div class="max-w-4xl mx-auto p-4">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow p-4 mb-8">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold">麻将记分</h1>
        <div class="flex gap-2">
          <button 
            @click="showSettings = true"
            class="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">设置</span>
          </button>
          <button 
            @click="exportData"
            class="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">导出</span>
          </button>
          <button 
            @click="resetScores"
            class="flex items-center gap-1 px-3 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">重置</span>
          </button>
        </div>
      </div>

      <!-- 基础信息展示 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
        <div class="flex flex-wrap gap-2 sm:gap-4">
          <span>基础分：{{ baseScore }}元</span>
          <span>庄家：{{ players[banker].name }}</span>
          <span>轮庄：{{ autoCycleBanker ? '自动' : '手动' }}</span>
        </div>
        <div class="mt-2 sm:mt-0">
          第{{ history.length + 1 }}圈
        </div>
      </div>
    </div>

    <!-- 玩家分数展示 -->
    <div class="grid grid-cols-4 gap-4 mb-8">
      <div v-for="(player, index) in players" :key="index" 
           class="bg-white rounded-lg shadow p-4 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <h2 class="text-xl font-bold">{{ player.name }}</h2>
          <!-- 庄家标识 -->
          <span v-if="index === banker" 
                class="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            庄
          </span>
        </div>
        <p class="text-2xl" :class="player.score >= 0 ? 'text-green-600' : 'text-red-600'">
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

    <!-- 记分表单 -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-bold mb-4">记录分数</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 左侧：基本选择 -->
        <div class="space-y-4">
          <!-- 赢家选择 -->
          <div>
            <label class="block text-sm font-medium mb-2">赢家</label>
            <div class="grid grid-cols-4 gap-2">
              <button 
                v-for="(player, index) in players" 
                :key="index"
                @click="selectWinner(index)"
                class="px-3 py-2 rounded-lg text-sm"
                :class="selectedWinner === index 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'"
              >
                {{ player.name }}
              </button>
            </div>
          </div>

          <!-- 胡牌方式 -->
          <div v-if="selectedWinner !== null">
            <label class="block text-sm font-medium mb-2">胡牌方式</label>
            <div class="flex gap-4">
              <button 
                @click="winType = 'dianpao'"
                class="flex-1 px-4 py-2 rounded-lg text-sm"
                :class="winType === 'dianpao' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
              >
                点炮
              </button>
              <button 
                @click="winType = 'zimo'"
                class="flex-1 px-4 py-2 rounded-lg text-sm"
                :class="winType === 'zimo' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
              >
                自摸
              </button>
            </div>
          </div>

          <!-- 点炮人选择 -->
          <div v-if="winType === 'dianpao'">
            <label class="block text-sm font-medium mb-2">点炮人</label>
            <div class="grid grid-cols-4 gap-2">
              <button 
                v-for="(player, index) in players" 
                :key="index"
                @click="selectLoser(index)"
                class="px-3 py-2 rounded-lg text-sm"
                :class="[
                  index === selectedWinner ? 'opacity-50 cursor-not-allowed' : '',
                  selectedLoser === index 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
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
          <div>
            <label class="block text-sm font-medium mb-2">赢分</label>
            <div class="flex gap-4">
              <input 
                type="number"
                v-model="winAmount"
                class="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="输入赢分"
              >
              <button 
                @click="calculateScores"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                计算
              </button>
            </div>
          </div>

          <!-- 分数预览 -->
          <div v-if="previewScores.length > 0">
            <label class="block text-sm font-medium mb-2">分数预览</label>
            <div class="grid grid-cols-4 gap-2 mb-4">
              <div v-for="(score, index) in previewScores" :key="index"
                   class="bg-gray-50 p-2 rounded-lg text-center">
                <div class="text-sm text-gray-600">{{ players[index].name }}</div>
                <div :class="score >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ score >= 0 ? '+' + score : score }}
                </div>
              </div>
            </div>
            <button 
              @click="recordScores"
              class="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              确认记录
            </button>
          </div>

          <p class="text-sm text-gray-500">
            庄家{{ selectedWinner === banker ? '赢' : '输' }}分将额外{{ selectedWinner === banker ? '得到' : '扣除' }}基础分({{ baseScore }}元)
          </p>
        </div>
      </div>
    </div>

    <!-- 历史记录 -->
    <div class="mt-8 bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-bold mb-4">历史记录</h3>
      <div class="space-y-4">
        <div v-for="(record, index) in history" :key="index" 
             class="p-4 border rounded-lg">
          <div class="flex justify-between items-center mb-2">
            <div class="text-sm text-gray-500">
              第{{ history.length - index }}圈 | {{ record.time }}
            </div>
            <div class="text-sm">
              <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                庄家：{{ record.banker }}
              </span>
            </div>
          </div>
          <div class="mb-2 text-sm">
            <span class="text-blue-600">{{ record.winner }}</span>
            <span class="mx-1">{{ record.winType === 'zimo' ? '自摸' : '胡' }}</span>
            <span v-if="record.winType === 'dianpao'" class="text-red-600">
              {{ record.loser }} 点炮
            </span>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div v-for="(score, playerIndex) in record.scores" :key="playerIndex" 
                 class="flex items-center">
              <span class="text-gray-600 mr-2">{{ players[playerIndex].name }}:</span>
              <span :class="score >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ score >= 0 ? '+' + score : score }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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

// 计算实际分数
const calculateActualScore = (playerIndex: number, isBanker: boolean) => {
  // 基础分 + (庄家额外基础分)
  return baseScore.value + (isBanker ? baseScore.value : 0)
}

const calculateScores = () => {
  if (selectedWinner.value === null || !winAmount.value) return
  
  if (winType.value === 'dianpao' && selectedLoser.value !== null) {
    // 点炮计分
    const winnerIsBanker = selectedWinner.value === banker.value
    const loserIsBanker = selectedLoser.value === banker.value
    
    let finalWinScore = winAmount.value
    let finalLoseScore = winAmount.value

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
      
      let loseScore = winAmount.value
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
</script> 
