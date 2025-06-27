export class Chart {
  constructor(ctx, config) {
    this.ctx = ctx
    this.config = config
    this.chart = new ChartJs(ctx, config)
  }

  destroy() {
    this.chart.destroy()
  }
}

// A minimal Chart.js wrapper
class ChartJs {
  constructor(ctx, config) {
    this.ctx = ctx
    this.config = config
    this.data = config.data
    this.type = config.type
    this.options = config.options
  }

  destroy() {
    this.ctx = null
    this.config = null
    this.data = null
    this.type = null
    this.options = null
  }
}

export const ChartContainer = () => null
export const ChartTooltip = () => null
export const ChartTooltipContent = () => null
export const ChartLegend = () => null
export const ChartLegendContent = () => null
export const ChartStyle = () => null
