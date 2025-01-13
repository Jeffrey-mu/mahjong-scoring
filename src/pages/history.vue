<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2 sm:p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 p-3 sm:p-4 mb-4 sm:mb-8">
        <div class="flex justify-between items-center mb-3">
          <h1
            class="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent">
            历史记录
          </h1>
          <router-link to="/" class="flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-gray-800/80 to-gray-700/80
                   hover:from-gray-700/80 hover:to-gray-600/80 rounded-lg text-white/90 transition-all duration-200">
            返回
          </router-link>
        </div>
      </div>

      <!-- 历史记录列表 -->
      <div class="space-y-6">
        <div v-for="(data, dateIndex) in history" :key="dateIndex">
          <!-- 日期标题 -->
          <div class="text-white/80 text-sm mb-3 pl-2 border-l-2 border-yellow-400/50">
            {{ data.date }}
          </div>

          <!-- 当天的记录 -->
          <div class="space-y-4">
            <div v-for="(record, index) in data.data" :key="index" class="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4
                        transition-all duration-300 hover:bg-white/20">
              <div class="flex justify-between items-center mb-2">
                <div class="text-sm text-gray-300/90">
                  第{{ history.length - index }}圈 | {{ record.time }}
                </div>
                <div class="text-sm">
                  <span class="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-400/20">
                    庄家：{{ record.banker }}
                  </span>
                </div>
              </div>

              <div class="mb-2 text-sm">
                <span class="text-blue-400">{{ record.winner }}</span>
                <span class="mx-1 text-gray-300/90">{{ record.winType === 'zimo' ? '自摸' : '胡' }}</span>
                <span v-if="record.winType === 'dianpao'" class="text-rose-400">
                  {{ record.loser }} 点炮
                </span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div v-for="(score, playerIndex) in record.scores" :key="playerIndex" class="flex items-center justify-between sm:justify-start gap-2
                            bg-white/5 rounded-lg p-2">
                  <span class="text-gray-300/90">{{ getPlayerName(playerIndex) }}</span>
                  <span :class="score >= 0
                    ? 'text-emerald-400 drop-shadow-[0_0_2px_rgba(52,211,153,0.2)]'
                    : 'text-rose-400 drop-shadow-[0_0_2px_rgba(251,113,133,0.2)]'">
                    {{ score >= 0 ? '+' + score : score }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
interface History {
  data: Record[]
  date: string
}

const history = ref<History[]>([])
const defaultNames = ['东', '南', '西', '北']

// 获取玩家名称
const getPlayerName = (index: number): string => {
  return defaultNames[index]
}

// 从本地存储加载数据
const loadFromStorage = () => {
  try {
    const savedState = localStorage.getItem('mahjongHistory')
    if (savedState) {
      const state = JSON.parse(savedState)
      history.value = state
    }
  } catch (error) {
    console.error('Failed to load state from storage:', error)
  }
}


// 组件挂载时加载数据
onMounted(() => {
  loadFromStorage()
})
</script>