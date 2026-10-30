import type { SiteMeta } from './types';

const zh: SiteMeta = {
  pages: {
    home: {
      title: 'Scrum Poker Online — 面向敏捷团队的免费计划扑克',
      description: '面向敏捷团队的免费在线计划扑克：支持 Scrum、斐波那契、T 恤尺码和自定义牌组，实时揭晓投票，无需注册，几秒即可开始。',
    },
    guide: {
      title: '如何开展 Scrum Poker 会议：分步指南',
      description: '分步讲解如何开展 Scrum Poker 会议：免费创建房间、分享链接、私下投票、同时揭晓并商定估算。另附牌组、特殊卡牌和主持技巧。',
    },
    blog: {
      title: '博客与指南',
      description: '关于敏捷估算、计划扑克、故事点和冲刺规划最佳实践的文章与指南，以及如何与团队高效使用 Scrum Poker 开展估算会议。',
    },
    pricing: {
      title: '免费计划扑克，全部功能可用',
      description: 'Scrum Poker Online 完全免费：每个房间最多 50 人，自定义牌组、共享计时器、轮次历史和 CSV 导出。无需注册，无需信用卡。',
    },
    demo: {
      title: '演示：一轮已揭晓的计划扑克',
      description: '预览一轮投票揭晓后的计划扑克：投票结果、分布和自动统计。创建房间之前，先看看 Scrum Poker Online。',
    },
    privacy: {
      title: '隐私政策',
      description: 'Scrum Poker Online 如何处理你的数据：没有账号，不出售数据，不收集支付信息。房间数据会自动删除。',
    },
    terms: {
      title: '服务条款',
      description: 'Scrum Poker Online 的服务条款：一款面向敏捷团队、目前完全免费的计划扑克工具。涵盖房间、保存的房间、可接受的使用、责任限制和源代码。',
    },
    fibonacci: {
      title: '斐波那契计划扑克详解',
      description: '计划扑克中的斐波那契数列：0、1、2、3、5、8、13、21 及以上，间隔为何越来越大，一轮如何进行，以及何时拆分故事。',
    },
    tshirt: {
      title: '敏捷估算中的 T 恤尺码',
      description: 'T 恤尺码估算详解：从 XS 到 XXL 的尺度，相对估算何时优于故事点，如何把尺码换算成点数，以及如何主持一次估算。',
    },
    cards: {
      title: '计划扑克卡牌：数值与牌组',
      description: '计划扑克卡牌上有什么：Scrum、斐波那契、T 恤尺码、2 的幂和自定义牌组，? 和咖啡卡，以及打印卡牌与在线卡牌的对比。',
    },
  },
  articles: {
    'agile-velocity': { title: '敏捷速度：故事点与冲刺产能' },
    'estimation-consensus': { title: '如何在计划扑克中达成估算共识' },
    'fibonacci-vs-tshirt': { title: '斐波那契还是 T 恤尺码？' },
    'free-scrum-poker-tools': { title: '最好的免费 Scrum Poker 工具' },
    'remote-sprint-planning': { title: '如何远程进行冲刺规划' },
    'scrum-poker-best-practices': { title: '10 条 Scrum Poker 最佳实践' },
    'sprint-planning-checklist': { title: '冲刺规划检查清单：12 个步骤' },
    'story-points-vs-hours': { title: '故事点还是小时？' },
    'what-is-planning-poker': { title: '什么是计划扑克？完整指南' },
  },
  notFound: '找不到页面',
  imageAlt: {
    site: 'Scrum Poker Online — 面向敏捷团队的免费计划扑克',
    blog: 'Scrum Poker Online — 博客与指南',
  },
};

export default zh;
