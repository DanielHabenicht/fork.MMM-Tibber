function drawVoltageGauge(moduleId, config, gaugeOptions, is3phase) {
  const innerRadius3 = 60;
  const radius = 100;
  const innerRadius2 = innerRadius3 + (radius - innerRadius3) / 3;
  const innerRadius1 = is3phase
    ? radius - (radius - innerRadius3) / 3
    : innerRadius3;
  const labelFontSize = is3phase
    ? config.gaugesValueFontSize3phase
    : config.gaugesValueFontSize;

  const voltageGauge = Highcharts.chart(
    "voltage-" + moduleId,
    Highcharts.merge(gaugeOptions, {
      yAxis: {
        min: config.voltageGaugeMinValue,
        max: config.voltageGaugeMaxValue,
        tickPositions: [
          config.voltageGaugeMinValue,
          config.voltageGaugeNominalValue,
          config.voltageGaugeMaxValue
        ],
        title: {
          text: config.voltageGaugeTitle
        },
        labels: {
          distance: 18,
          formatter: function() {
            return this.value.toFixed(0);
          }
        }
      },

      credits: {
        enabled: false
      },

      series: [
        {
          name: "Phase1",
          data: [{ y: 0, color: "#000" }],
          innerRadius: innerRadius1,
          radius: radius - 1,
          dataLabels: {
            enabled: true,
            x: is3phase ? -38 - config.gaugesValueDistanceAdjustment : 0,
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:' +
              labelFontSize +
              'px">{y}</span><br/>' +
              "</div>"
          }
        },
        {
          name: "Phase2",
          data: [{ y: 0, color: "#000" }],
          innerRadius: innerRadius2,
          radius: innerRadius1 - 1,
          visible: is3phase,
          dataLabels: {
            enabled: true,
            x: 0,
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:' +
              labelFontSize +
              'px">{y}</span><br/>' +
              "</div>"
          }
        },
        {
          name: "Phase3",
          data: [{ y: 0, color: "#000" }],
          innerRadius: innerRadius3,
          radius: innerRadius2 - 1,
          visible: is3phase,
          dataLabels: {
            enabled: true,
            x: 38 + config.gaugesValueDistanceAdjustment,
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:' +
              labelFontSize +
              'px">{y}</span><br/>' +
              "</div>"
          }
        }
      ]
    })
  );
  return voltageGauge;
}
