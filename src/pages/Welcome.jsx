import React from 'react';
import ProCard from '@ant-design/pro-card';
import { TinyColumn  } from '@ant-design/charts';


export default () => {
  var data = [274, 337, 81, 497, 666, 219, 269];
  var config = {
      height: 64,
      width: 240,
      autoFit: false,
      data: data,
      tooltip: {
          customContent: function customContent(x, data) {
              var _data$, _data$$data;
              return 'NO.'
                  .concat(x, ': ')
                  .concat((_data$ = data[0]) === null || _data$ === void 0
                  ? void 0
                  : (_data$$data = _data$.data) === null || _data$$data === void 0
                      ? void 0
                      : _data$$data.y.toFixed(2));
          },
      },
  };


  return (
    <>
      <ProCard gutter={15} title="24栅格" style={{backgroundColor:'#f0f2f5'}}>
        <ProCard colSpan={6} layout="center" bordered style={{height:200}}>
          <TinyColumn {...config}/>
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          <TinyColumn {...config}/>
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          colSpan-6
        </ProCard>
        <ProCard colSpan={6} layout="center" bordered>
          colSpan-6
        </ProCard>
      </ProCard>

      <ProCard style={{ marginTop: 8 }} gutter={15} ghost>
        <ProCard colSpan={24} layout="center" bordered>
          {/* <Column {...config}/> */}
        </ProCard>
      </ProCard>

      <ProCard style={{ marginTop: 8 }} gutter={15} ghost>
        <ProCard colSpan={12} bordered layout="center">
          Auto
        </ProCard>
        <ProCard colSpan={12} bordered layout="center">
          Auto
        </ProCard>
      </ProCard>
    </>
  );
};




