<template>
  <div class="max-w-4xl mx-auto p-4">
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

    <!-- 基础分设置 -->
    <div class="bg-white rounded-lg shadow p-6 mb-4">
      <h3 class="text-lg font-bold mb-4">基础分设置</h3>
      <div class="flex items-center gap-4">
        <input 
          type="number"
          v-model="baseScore"
          class="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="设置基础分"
        >
        <span class="text-gray-600">当前基础分：{{ baseScore }}元</span>
      </div>
    </div>

    <!-- 庄家设置 -->
    <div class="bg-white rounded-lg shadow p-6 mb-4">
      <h3 class="text-lg font-bold mb-4">庄家设置</h3>
      <div class="grid grid-cols-4 gap-4">
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
    </div>

    <!-- 记分表单 -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-lg font-bold mb-4">记录分数</h3>
      
      <!-- 赢家选择 -->
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">赢家</label>
        <div class="grid grid-cols-4 gap-4">
          <button 
            v-for="(player, index) in players" 
            :key="index"
            @click="selectWinner(index)"
            class="px-4 py-2 rounded-lg"
            :class="selectedWinner === index 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'"
          >
            {{ player.name }}
          </button>
        </div>
      </div>

      <!-- 点炮/自摸选择 -->
      <div v-if="selectedWinner !== null" class="mb-4">
        <label class="block text-sm font-medium mb-2">胡牌方式</label>
        <div class="flex gap-4 mb-4">
          <button 
            @click="winType = 'dianpao'"
            class="px-4 py-2 rounded-lg"
            :class="winType === 'dianpao' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
          >
            点炮
          </button>
          <button 
            @click="winType = 'zimo'"
            class="px-4 py-2 rounded-lg"
            :class="winType === 'zimo' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'"
          >
            自摸
          </button>
        </div>

        <!-- 点炮人选择（仅在点炮时显示） -->
        <div v-if="winType === 'dianpao'" class="mb-4">
          <label class="block text-sm font-medium mb-2">点炮人</label>
          <div class="grid grid-cols-4 gap-4">
            <button 
              v-for="(player, index) in players" 
              :key="index"
              @click="selectLoser(index)"
              class="px-4 py-2 rounded-lg"
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

      <!-- 赢分输入 -->
      <div v-if="canInputScore" class="mb-4">
        <label class="block text-sm font-medium mb-2">赢分</label>
        <div class="flex gap-4">
          <input 
            type="number"
            v-model="winAmount"
            class="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="输入赢分"
          >
          <button 
            @click="calculateScores"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            计算分数
          </button>
        </div>
        <p class="text-sm text-gray-500 mt-1">
          庄家{{ selectedWinner === banker ? '赢' : '输' }}分将额外{{ selectedWinner === banker ? '得到' : '扣除' }}基础分({{ baseScore }}元)
        </p>
      </div>

      <!-- 分数预览 -->
      <div v-if="previewScores.length > 0" class="mb-4">
        <h4 class="text-sm font-medium mb-2">分数预览</h4>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(score, index) in previewScores" :key="index"
               class="text-center">
            <div class="font-medium">{{ players[index].name }}</div>
            <div :class="score >= 0 ? 'text-green-600' : 'text-red-600'">
              {{ score >= 0 ? '+' + score : score }}
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-center">
          <button 
            @click="recordScores"
            class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            确认记录
          </button>
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

    <!-- 添加重置按钮 -->
    <div class="mt-4 flex justify-end gap-4">
      <button 
        @click="exportData"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        导出记录
      </button>
      <button 
        @click="resetScores"
        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        重置所有分数
      </button>
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
      history: history.value
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
}

const selectLoser = (index: number) => {
  if (index !== selectedWinner.value) {
    selectedLoser.value = index
    previewScores.value = []
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

  // 重置
  selectedWinner.value = null
  selectedLoser.value = null
  winType.value = null
  winAmount.value = 0
  previewScores.value = []
}

const resetScores = () => {
  if (confirm('确定要重置所有数据吗？这将清除所有历史记录。')) {
    players.value.forEach(player => player.score = 0)
    history.value = []
    selectedWinner.value = null
    selectedLoser.value = null
    winType.value = null
    winAmount.value = 0
    previewScores.value = []
    // 清除本地存储
    localStorage.removeItem('mahjongState')
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
</script> 
