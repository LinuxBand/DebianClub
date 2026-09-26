'use client';

import { useEffect, useState } from 'react';
import { bootModes, encryptionModes, partitionDisks } from './data';
import { hasRecordKey, parseToolHash, partitionPlan, toolHashIds } from './logic';
import { docsHref, toolText } from './text';
import { ButtonGroup, CopyButton, ResultPanel, ShareLinkButton, copyText, useCopiedFeedback } from './ui';
import type { BootMode, EncryptionMode, PartitionDisk, ToolLanguage } from './types';

export function PartitionTool({ lang }: { lang: ToolLanguage }) {
  const t = toolText[lang];
  const [disk, setDisk] = useState<PartitionDisk>('standard');
  const [boot, setBoot] = useState<BootMode>('single');
  const [encryption, setEncryption] = useState<EncryptionMode>('none');
  const [shareCopied, showShareCopied] = useCopiedFeedback();
  const plan = partitionPlan(disk, boot, encryption, lang);
  const planText = plan.map((row) => row.join(' | ')).join('\n');

  useEffect(() => {
    function syncPartitionStateFromHash() {
      const hashState = parseToolHash(window.location.hash);
      if (hashState.id !== toolHashIds.partition) return;

      const nextDisk = hashState.params.get('disk');
      const nextBoot = hashState.params.get('boot');
      const nextEncryption = hashState.params.get('encryption');

      if (hasRecordKey(partitionDisks, nextDisk)) setDisk(nextDisk);
      if (hasRecordKey(bootModes, nextBoot)) setBoot(nextBoot);
      if (hasRecordKey(encryptionModes, nextEncryption)) setEncryption(nextEncryption);
    }

    syncPartitionStateFromHash();
    window.addEventListener('hashchange', syncPartitionStateFromHash);
    return () => window.removeEventListener('hashchange', syncPartitionStateFromHash);
  }, []);

  async function copyShareLink() {
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = `${toolHashIds.partition}?disk=${disk}&boot=${boot}&encryption=${encryption}`;

    await copyText(url.toString());
    showShareCopied();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)]">
      <section className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.partition.disk}</h3>
          <ButtonGroup
            value={disk}
            onChange={setDisk}
            options={[
              { value: 'small', label: lang === 'zh' ? '小磁盘 < 256GB' : 'Small < 256GB' },
              { value: 'standard', label: lang === 'zh' ? '常规 512GB - 1TB' : 'Standard 512GB - 1TB' },
              { value: 'large', label: lang === 'zh' ? '大容量 2TB+' : 'Large 2TB+' },
              { value: 'multi', label: lang === 'zh' ? '多磁盘' : 'Multiple disks' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.partition.boot}</h3>
          <ButtonGroup
            value={boot}
            onChange={setBoot}
            options={[
              { value: 'single', label: lang === 'zh' ? '只装 Debian' : 'Debian only' },
              { value: 'dual', label: lang === 'zh' ? '与 Windows 双系统' : 'Dual boot with Windows' },
            ]}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{t.partition.encryption}</h3>
          <ButtonGroup
            value={encryption}
            onChange={setEncryption}
            options={[
              { value: 'none', label: lang === 'zh' ? '不加密' : 'No encryption' },
              { value: 'home', label: lang === 'zh' ? '只保护用户数据' : 'Protect user data' },
              { value: 'full', label: lang === 'zh' ? '全盘加密' : 'Full-disk encryption' },
            ]}
          />
        </div>
      </section>

      <ResultPanel lang={lang} title={t.partition.title}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-96 border-collapse text-sm">
            <thead>
              <tr className="border-b border-fd-border text-left text-fd-foreground">
                <th className="py-2 pr-3">{lang === 'zh' ? '分区' : 'Partition'}</th>
                <th className="py-2 pr-3">{lang === 'zh' ? '大小' : 'Size'}</th>
                <th className="py-2">{lang === 'zh' ? '说明' : 'Notes'}</th>
              </tr>
            </thead>
            <tbody>
              {plan.map(([name, size, note]) => (
                <tr key={name} className="border-b border-fd-border/60">
                  <td className="py-2 pr-3 font-mono text-fd-foreground">{name}</td>
                  <td className="py-2 pr-3">{size}</td>
                  <td className="py-2">{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CopyButton value={planText} label={t.copy} copiedLabel={t.copied} />
        <ShareLinkButton copied={shareCopied} label={t.partition.share} copiedLabel={t.partition.shareCopied} onClick={copyShareLink} />
        <a className="block text-fd-primary no-underline hover:underline" href={docsHref[lang].disk}>
          {t.partition.docs}
        </a>
      </ResultPanel>
    </div>
  );
}
