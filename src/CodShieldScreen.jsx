import React from 'react';
import { codPlatforms, codSyncStates, createCodSync } from './cod-platforms.js';

const screens = {
  home: { title: ['Your home.', 'One support case.'], copy: ['Start with one report, not a separate', 'approval for every unwanted parcel.'], action: 'Report unwanted deliveries' },
  report: { title: ['Orders I never', 'placed'], copy: ['Tell support which household is affected.', 'A shopping account or order ID is not required.'], action: 'Request support' },
  verify: { title: ['Verify contact.', 'Then the exact unit.'], copy: ['A phone code confirms contact only.', 'It does not prove residence or consent.'], action: 'Preview the contact check' },
  pending: { title: ['Your report is', 'under review'], copy: ['Protection is not active.', 'An authorised household review is required.'], action: 'Support review pending', disabled: true },
  activate: { title: ['Review household', 'protection'], copy: ['Genuine COD orders are affected too.', 'Check the exact unit, duration and consent.'], action: 'Activate COD protection', disabled: true },
  platforms: { title: ['Amazon protection', 'status'], copy: ['Amazon COD orders only.', 'Other apps need separate reports.'], action: 'Retry or contact Amazon support' },
  activating: { title: ['Activation requested.', 'Not active yet.'], copy: ['Wait for enforcement acknowledgement.', 'A request is not a successful restriction.'], action: 'Waiting for acknowledgement', disabled: true },
  active: { title: ['A protection example', 'for this household'], copy: ['Demo only. No delivery settings changed.', 'Participating COD systems only.'], action: 'End demo protection' },
  removing: { title: ['Removal requested.', 'Not complete yet.'], copy: ['Verify removal and await acknowledgement.', 'Do not promise normal COD has resumed.'], action: 'Removal acknowledgement pending', disabled: true },
  ended: { title: ['The example', 'protection has ended.'], copy: ['Removal acknowledgement is illustrated.', 'No real household settings were changed.'], action: 'Restart the demo' },
  help: { title: ['Support, disputes', 'and a clear appeal.'], copy: ['Report a wrong unit or household dispute.', 'An authorised support route would review it.'], action: 'Read the example appeal route' }
};

function Lines({ lines, x = 36, y, size = 12, color = '#6a655d', gap = 19, weight }) {
  return lines.map((line, index) => <text key={line} x={x} y={y + index * gap} fill={color} fontSize={size} fontWeight={weight}>{line}</text>);
}

function Card({ y, title, lines, accent = false }) {
  return <g>
    <rect x="30" y={y} width="330" height={56 + lines.length * 19} rx="15" fill={accent ? '#fddeb9' : '#fffdf8'} stroke="#ded9cf" />
    <Lines x={46} y={y + 27} lines={[title]} size={14} color="#272521" weight="700" />
    <Lines x={46} y={y + 50} lines={lines} />
  </g>;
}

function PlatformRows({ statuses, y = 295, compact = false }) {
  return [codPlatforms[0]].map((platform, index) => {
    const top = y + index * (compact ? 61 : 78);
    const status = statuses[platform.id];
    return <g key={platform.id}>
      <rect x="30" y={top} width="330" height={compact ? 53 : 70} rx="12" fill={['failed', 'removal-failed'].includes(status) ? '#fddeb9' : '#fffdf8'} stroke="#ded9cf" />
      <text x="46" y={top + 23} fill="#272521" fontSize="13" fontWeight="700">{platform.name} COD protection</text>
      <text x="46" y={top + 42} fill="#6a655d" fontSize="11">{codSyncStates[status][0]}</text>
      {!compact && <text x="46" y={top + 59} fill="#6a655d" fontSize="9">{status === 'confirmed' ? 'Exact unit / COD only / fictional acknowledgement'
        : status === 'failed' ? 'Not protected in this example / retry or escalate'
          : status === 'removal-pending' ? 'COD resumption is not confirmed'
            : 'Acknowledgement required / not confirmed'}</text>}
    </g>;
  });
}

export default function CodShieldScreen({ state = 'report' }) {
  const screen = screens[state];
  if (!screen) throw new Error(`Unknown COD Shield screen: ${state}`);
  return <svg className="cod-mobile-screen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 844" width="390" height="844"
    role="img" aria-label={`COD Shield ${state} mobile-app concept screen. Fictional example; no real service.`} fontFamily="Arial, sans-serif">
    <rect x="3" y="3" width="384" height="838" rx="38" fill="#272521" />
    <rect x="11" y="11" width="368" height="822" rx="30" fill="#f4f2ee" />
    <text x="32" y="40" fill="#272521" fontSize="11" fontWeight="700">9:41</text>
    <rect x="145" y="20" width="100" height="18" rx="9" fill="#272521" />
    <path d="M319 31h3v7h-3Zm6-3h3v10h-3Zm6-3h3v13h-3Z" fill="#272521" />
    <rect x="341" y="27" width="17" height="10" rx="2" fill="none" stroke="#272521" />
    <rect x="343" y="29" width="12" height="6" rx="1" fill="#272521" />
    <rect x="30" y="65" width="34" height="34" rx="11" fill="#fddeb9" />
    <path d="m47 72-9 4v8c0 5 9 10 9 10s9-5 9-10v-8Z" fill="none" stroke="#272521" strokeWidth="1.7" />
    <text x="76" y="81" fill="#272521" fontSize="17" fontWeight="700">Amazon / COD Shield</text>
    <text x="76" y="98" fill="#6a655d" fontSize="9">FEATURE CONCEPT / AMAZON ORDERS ONLY</text>
    <rect x="30" y="123" width="170" height="25" rx="12" fill="#fddeb9" />
    <text x="42" y="140" fill="#272521" fontSize="10">{state === 'active' ? 'DEMO PROTECTION EXAMPLE' : 'FICTIONAL CASE / CS-1042'}</text>
    <Lines x={30} y={185} lines={screen.title} size={25} color="#272521" gap={30} weight="700" />
    <Lines x={30} y={246} lines={screen.copy} />
    {state === 'home' && <>
      <Card y={295} title="Your household" lines={['Example home / Unit 4B', 'No protection is active.']} />
      <Card y={421} title="Amazon COD orders only" lines={['Other shopping apps are unaffected.', 'They need their own reports and review.', 'Temporary protection, expiry and a clear exit.']} accent />
    </>}
    {state === 'report' && <>
      <text x="30" y="314" fill="#272521" fontSize="13">Affected home and unit</text>
      <rect x="30" y="329" width="330" height="48" rx="12" fill="#fffdf8" stroke="#ded9cf" />
      <text x="44" y="358" fill="#272521" fontSize="14">Example home / Unit 4B</text>
      <text x="30" y="411" fill="#272521" fontSize="13">Order ID (optional)</text>
      <rect x="30" y="426" width="330" height="48" rx="12" fill="#fffdf8" stroke="#ded9cf" />
      <text x="44" y="455" fill="#6a655d" fontSize="13">Not needed to report</text>
      <Card y={504} title="Another proposed route" lines={['Official phone support records one case.', 'Do not ask the resident to approve each order.']} />
    </>}
    {state === 'verify' && <>
      <Card y={295} title="01 / Confirm contact" lines={['Use an agreed, safe contact method.', 'No phone code is sent by this demo.']} />
      <Card y={421} title="02 / Review the household" lines={['Check connection to the exact delivery unit.', 'Use proportionate residence evidence.', 'A contact check cannot authorise a block.']} accent />
    </>}
    {state === 'pending' && <>
      <Card y={295} title="Report received" lines={['Example case CS-1042', 'No support request was actually sent.']} />
      <Card y={421} title="Residence review pending" lines={['Contact and exact unit must be checked.', 'Protection is unavailable until approval.', 'No resident is verified by this prototype.']} accent />
    </>}
    {state === 'activate' && <>
      <Card y={292} title="Example home / Unit 4B" lines={['Exact household delivery unit', 'Illustrative duration: 7 days']} />
      <Card y={414} title="Understand the trade-off" lines={['Eligible Amazon COD orders only.', 'Genuine household COD orders are affected.', 'No prepaid cover or competitor restrictions.', 'Automatic expiry and verified early removal.']} accent />
      <rect x="30" y="577" width="19" height="19" rx="4" fill="#fffdf8" stroke="#a69d90" />
      <Lines x={60} y={589} lines={['I understand the household impact', 'and will tell other household members.']} size={11} gap={17} />
    </>}
    {['platforms', 'activating', 'removing'].includes(state) && <>
      <PlatformRows statuses={createCodSync(state === 'platforms' ? 'failed' : state === 'removing' ? 'removal-pending' : 'pending')} />
      <Card y={393} title="This app only" lines={['Example home / Unit 4B', 'Eligible Amazon COD orders only.', 'Other apps need separate reports.']} accent />
      <Lines x={30} y={638} size={11} lines={state === 'platforms'
        ? ['Amazon confirmation failed in this example.', "Retry or contact this app's support team."]
        : ['Waiting for Amazon to confirm its own change.', 'No real connection or protection.']} />
    </>}
    {state === 'active' && <>
      <Card y={295} title="Example home / Unit 4B" lines={['Illustrative duration: 7 days', 'Acknowledgement is simulated.']} accent />
      <PlatformRows y={411} compact statuses={createCodSync('confirmed')} />
      <Card y={488} title="What this changes" lines={['Matched new Amazon COD orders stop upstream.', 'Earlier parcels still need interception.', 'Other shopping apps are unaffected.']} />
      <Lines x={30} y={677} size={10} lines={['Earlier parcel interception is not guaranteed.']} />
    </>}
    {state === 'ended' && <>
      <Card y={295} title="Demo removal acknowledged" lines={['The example restriction has ended.', 'This preview did not change delivery settings.']} accent />
      <PlatformRows y={411} compact statuses={createCodSync('removed')} />
      <Card y={488} title="If unwanted deliveries continue" lines={['Contact Amazon support about Amazon orders.', 'Report other apps separately.', 'No cross-app restriction is created here.']} />
    </>}
    {state === 'help' && <>
      <Card y={295} title="Challenge a wrong restriction" lines={['Wrong unit, household dispute or buyer appeal.', 'An accountable reviewer must investigate.', 'An address alone is not proof of abuse.']} accent />
      <Card y={442} title="Accessible alternatives" lines={['A web case page and official phone support.', 'Agree on a safe, limited contact method.', 'No call, message or appeal is sent here.']} />
    </>}
    <rect x="30" y="698" width="330" height="48" rx="14" fill={screen.disabled ? '#e2ddd4' : '#272521'} />
    <text x="195" y="728" textAnchor="middle" fill={screen.disabled ? '#6a655d' : '#fffdf8'} fontSize="12" fontWeight="700">{screen.action}</text>
    <text x="195" y="768" textAnchor="middle" fill="#6a655d" fontSize="9">Original concept. No verification or actual protection.</text>
    <path d="M12 782h366" stroke="#ded9cf" />
    {['Home', 'My case', 'Status', 'Help'].map((label, index) => <text key={label} x={57 + index * 92} y="807" textAnchor="middle"
      fill={(state === 'home' ? 0 : state === 'platforms' ? 2 : state === 'help' ? 3 : 1) === index ? '#272521' : '#8a8378'} fontSize="10" fontWeight="700">{label}</text>)}
    <rect x="142" y="819" width="106" height="4" rx="2" fill="#272521" />
  </svg>;
}
