<template>
  <div class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">配送政策</h1>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          最后更新日期：2023年12月1日
        </p>
      </div>
      
      <!-- 内容 -->
      <div class="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div class="prose dark:prose-invert max-w-none">
          <p>
            本配送政策旨在说明我们的订单处理、配送方式、配送时间和相关费用等信息。请在下单前仔细阅读本政策。
          </p>
          
          <h2>1. 订单处理</h2>
          <h3>1.1 订单确认</h3>
          <p>
            当您成功下单后，我们将向您发送订单确认邮件。此邮件包含您的订单号、订购产品、支付金额和预计发货时间等信息。如果您没有收到确认邮件，请检查您的垃圾邮件文件夹或联系我们的客服团队。
          </p>
          
          <h3>1.2 订单处理时间</h3>
          <p>
            我们的订单处理时间取决于产品类型和库存状况：
          </p>
          <ul>
            <li>现货产品：通常在确认付款后1-2个工作日内处理</li>
            <li>定制产品：根据定制要求和生产周期，通常需要5-15个工作日</li>
            <li>预售产品：请参考产品页面上的预计发货日期</li>
          </ul>
          <p>
            在节假日或促销期间，订单处理时间可能会延长。如果您的订单处理时间超过预期，我们将通过邮件通知您。
          </p>
          
          <h3>1.3 订单状态跟踪</h3>
          <p>
            您可以通过以下方式跟踪您的订单状态：
          </p>
          <ul>
            <li>登录您的账户，进入"我的订单"页面</li>
            <li>使用订单确认邮件中的订单号和跟踪链接</li>
            <li>联系我们的客服团队，提供您的订单号</li>
          </ul>
          
          <h2>2. 配送范围</h2>
          <p>
            我们目前向全球大部分国家和地区提供配送服务。然而，由于各国法规和物流限制，某些国家和地区可能无法提供服务或需要特殊安排。
          </p>
          <p>
            如果您所在的国家或地区不在我们的配送范围内，系统将在结账过程中提示您。您也可以联系我们的客服团队，了解是否有其他配送选择。
          </p>
          
          <h2>3. 配送方式</h2>
          <p>
            我们提供多种国际配送方式，以满足不同客户的需求：
          </p>
          
          <h3>3.1 快递服务</h3>
          <table class="min-w-full border-collapse">
            <thead>
              <tr>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">配送方式</th>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">预计配送时间</th>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">跟踪服务</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">DHL Express</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">3-5个工作日</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">全程跟踪</td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">FedEx International Priority</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">3-5个工作日</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">全程跟踪</td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">UPS Worldwide Expedited</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">3-5个工作日</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">全程跟踪</td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">EMS</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">5-10个工作日</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">全程跟踪</td>
              </tr>
            </tbody>
          </table>
          
          <h3>3.2 经济配送</h3>
          <table class="min-w-full border-collapse">
            <thead>
              <tr>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">配送方式</th>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">预计配送时间</th>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">跟踪服务</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">国际邮政小包</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">10-20个工作日</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">部分跟踪</td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">ePacket</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">7-15个工作日</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">全程跟踪</td>
              </tr>
            </tbody>
          </table>
          
          <h3>3.3 大宗货物配送</h3>
          <table class="min-w-full border-collapse">
            <thead>
              <tr>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">配送方式</th>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">预计配送时间</th>
                <th class="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">跟踪服务</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">海运</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">20-40天</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">集装箱跟踪</td>
              </tr>
              <tr>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">空运</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">7-15天</td>
                <td class="border border-gray-300 dark:border-gray-700 px-4 py-2">航班跟踪</td>
              </tr>
            </tbody>
          </table>
          <p>
            请注意，上述配送时间仅为估计，实际配送时间可能因目的地国家/地区的海关处理、天气条件和其他不可控因素而有所不同。
          </p>
          
          <h2>4. 配送费用</h2>
          <p>
            配送费用根据以下因素计算：
          </p>
          <ul>
            <li>配送目的地</li>
            <li>配送方式</li>
            <li>包裹重量和体积</li>
            <li>订单金额</li>
          </ul>
          <p>
            具体的配送费用将在结账过程中显示。我们可能会不定期提供免运费促销活动，请关注我们的网站公告和营销邮件。
          </p>
          
          <h3>4.1 免费配送</h3>
          <p>
            对于满足以下条件的订单，我们提供免费配送：
          </p>
          <ul>
            <li>订单金额超过$200（使用经济配送方式）</li>
            <li>订单金额超过$500（使用快递服务）</li>
          </ul>
          <p>
            免费配送政策可能因促销活动而有所变化，请以结账页面显示的信息为准。
          </p>
          
          <h2>5. 关税和税费</h2>
          <p>
            国际订单可能需要支付进口关税、税费和清关费用。这些费用由目的地国家/地区的海关部门征收，不包含在我们的产品价格或运费中。
          </p>
          <p>
            作为收件人，您负责支付所有适用的关税、税费和清关费用。我们建议您在下单前了解您所在国家/地区的进口政策和可能的额外费用。
          </p>
          
          <h2>6. 配送问题</h2>
          <h3>6.1 配送延迟</h3>
          <p>
            如果您的包裹超过预计配送时间仍未送达，请通过以下步骤检查：
          </p>
          <ol>
            <li>使用提供的跟踪号码在相应的物流公司网站上查询最新状态</li>
            <li>检查您的邮箱，查看是否有关于配送延迟的通知</li>
            <li>联系我们的客服团队，提供您的订单号和跟踪号码</li>
          </ol>
          
          <h3>6.2 包裹丢失或损坏</h3>
          <p>
            如果您的包裹在运输过程中丢失或损坏，请在收到包裹后（或预计送达日期后）的7天内联系我们。请提供以下信息：
          </p>
          <ul>
            <li>订单号和跟踪号码</li>
            <li>损坏情况的照片（如适用）</li>
            <li>包裹外包装的照片（如适用）</li>
          </ul>
          <p>
            我们将与物流公司协调，调查情况并提供适当的解决方案，如重新发货或退款。
          </p>
          
          <h3>6.3 错误配送</h3>
          <p>
            如果您收到了错误的产品或数量不符，请在收到包裹后的7天内联系我们，并提供以下信息：
          </p>
          <ul>
            <li>订单号</li>
            <li>收到的产品照片</li>
            <li>错误描述（如收到的产品与订购的不符，或数量不正确）</li>
          </ul>
          <p>
            我们将尽快解决问题，并根据情况安排补发或退款。
          </p>
          
          <h2>7. 特殊配送要求</h2>
          <p>
            如果您有特殊的配送要求，如指定配送日期、特定的配送地址格式或其他特殊安排，请在下单时在订单备注中注明，或在下单后立即联系我们的客服团队。我们将尽力满足您的要求，但不能保证所有特殊要求都能实现。
          </p>
          
          <h2>8. 联系我们</h2>
          <p>
            如果您对我们的配送政策有任何疑问，或需要关于您订单配送的帮助，请随时联系我们：
          </p>
          <ul>
            <li>电子邮件：shipping@example.com</li>
            <li>电话：+86 123 4567 8910（工作时间：周一至周五 9:00-18:00）</li>
            <li>在线客服：点击网站右下角的聊天图标</li>
            <li>填写<NuxtLink to="/contact" class="text-primary-600 dark:text-primary-400 hover:underline">联系表单</NuxtLink></li>
          </ul>
          <p>
            我们将尽快回复您的询问，通常在1个工作日内。
          </p>
          
          <h2>9. 政策更新</h2>
          <p>
            我们可能会不时更新本配送政策。任何更改将在网站上发布，并自发布之日起生效。我们建议您定期查看本政策以了解任何变更。
          </p>
        </div>
      </div>
      
      <!-- 底部导航 -->
      <div class="mt-12 text-center">
        <p class="text-gray-600 dark:text-gray-400 mb-4">其他法律文件</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/privacy-policy" class="text-primary-600 dark:text-primary-400 hover:underline">隐私政策</NuxtLink>
          <NuxtLink to="/terms-of-service" class="text-primary-600 dark:text-primary-400 hover:underline">服务条款</NuxtLink>
          <NuxtLink to="/return-policy" class="text-primary-600 dark:text-primary-400 hover:underline">退换货政策</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 页面元数据
useSeoMeta({
  title: '配送政策 - 外贸独立站',
  description: '了解我们的订单处理、配送方式、配送时间和相关费用等信息',
  ogTitle: '配送政策 - 外贸独立站',
  ogDescription: '了解我们的订单处理、配送方式、配送时间和相关费用等信息',
  ogImage: '/images/og-image.jpg',
})
</script> 