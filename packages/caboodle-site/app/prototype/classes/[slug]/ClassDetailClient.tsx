'use client';
import { useState } from 'react';
import Link from 'next/link';
import { BreadcrumbNav } from '@/components/prototype/BreadcrumbNav';
import { StudentRosterPreview } from '@/components/preview/StudentRosterPreview';
import type { RosterStudent } from '@/components/preview/StudentRosterPreview';
import type { MockClass, MockStudent, MockAssignment, MockAssessment, MockInsight, MockStudentGroup, MockReport, MockSkill, MockScore } from '@/lib/mock';

interface ClassDetailProps {
  cls: MockClass;
  students: MockStudent[];
  assignments: MockAssignment[];
  assessments: MockAssessment[];
  insights: MockInsight[];
  groups: MockStudentGroup[];
  reports: MockReport[];
  skills: MockSkill[];
  studentScores: { student: MockStudent; scores: MockScore[] }[];
}

const TABS = ['Roster', 'Assignments', 'Assessments', 'Curriculum Performance', 'Groups', 'Reports'] as const;
type Tab = typeof TABS[number];

function badgeClass(status?: string): string {
  const s = (status ?? '').toLowerCase().replace(/[\s/]/g, '-');
  return `proto-badge proto-badge--${s}`;
}

function bandBadge(band?: string) {
  if (!band) return null;
  const map: Record<string, string> = {
    'At/Above': 'above',
    'On Watch': 'watch',
    'Intervention': 'intervention',
    'Urgent': 'urgent',
  };
  const cls = map[band] ?? 'active';
  return <span className={`proto-badge proto-badge--${cls}`}>{band}</span>;
}

export function ClassDetailClient({ cls, students, assignments, assessments, insights, groups, reports, skills, studentScores }: ClassDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Roster');

  return (
    <div>
      <BreadcrumbNav items={[
        { label: 'Classes', href: '/prototype/classes' },
        { label: cls.name },
      ]} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)', marginBlockEnd: 'var(--s-1)' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#333' }}>{cls.name}</h1>
        <span className="proto-badge proto-badge--active">{cls.status}</span>
      </div>
      <div style={{ fontSize: '0.875rem', color: '#666', marginBlockEnd: 'var(--s1)' }}>
        {cls.teacher} · {cls.subject} · Grade {cls.grade} · {cls.period} · {cls.school}
      </div>

      {insights.length > 0 && (
        <div style={{ marginBlockEnd: 'var(--s1)' }}>
          <div className="proto-section-label">Insights for this class</div>
          <div className="stack" style={{ '--space': 'var(--s-1)' } as React.CSSProperties}>
            {insights.slice(0, 2).map(i => (
              <div key={i.id} className="proto-insight">
                <div className="proto-insight-title">{i.title}</div>
                <div className="proto-insight-body">{i.body}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="proto-tabs" role="tablist">
        {TABS.map(tab => (
          <button
            key={tab}
            role="tab"
            className="proto-tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Roster' && (
        <StudentRosterPreview
          students={students.map((s): RosterStudent => ({
            id: s.id,
            name: s.name,
            href: s.href,
            grade: s.grade ? `Grade ${s.grade}` : '',
            readingLevel: s.readingLevel,
            readingStatus: s.readingStatus,
            readingPercent: s.readingPercent,
            mathLevel: s.mathLevel,
            mathStatus: s.mathStatus,
            mathPercent: s.mathPercent,
            assignmentCount: s.assignmentCount,
            enrollmentStatus: s.enrollmentStatus,
          }))}
          menuItems={[
            { label: 'Add to Student Group' },
            { label: 'View Scores' },
          ]}
        />
      )}

      {activeTab === 'Assignments' && (
        <div className="stack" style={{ '--space': 'var(--s-1)' } as React.CSSProperties}>
          {assignments.map(a => (
            <div key={a.id} className="proto-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#333' }}>{a.name}</div>
                <div style={{ fontSize: '0.8125rem', color: '#666' }}>
                  {a.product} · {a.type} · Due {a.dueDate}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                <div style={{ fontSize: '0.8125rem', color: '#999' }}>
                  {a.completionPercent}% complete
                </div>
                <span className={badgeClass(a.status)}>{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'Assessments' && (
        <div className="stack" style={{ '--space': 'var(--s-1)' } as React.CSSProperties}>
          {assessments.map(a => (
            <Link key={a.id} href={`/prototype/assessments/${a.slug}`} className="proto-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#333' }}>{a.name}</div>
                <div style={{ fontSize: '0.8125rem', color: '#666' }}>
                  {a.type} · {a.subject} · {a.testingWindow}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s-1)' }}>
                {a.scoreAvg && <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Avg: {a.scoreAvg}</span>}
                <span className={badgeClass(a.status)}>{a.status}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === 'Curriculum Performance' && (
        <div>
          <div className="proto-card" style={{ marginBlockEnd: 'var(--s1)' }}>
            <div className="proto-card-title" style={{ marginBlockEnd: 'var(--s-1)' }}>
              How are students doing across the curriculum?
            </div>
            <p style={{ fontSize: '0.875rem', color: '#666', lineHeight: 1.5 }}>
              This view shows student performance across {cls.subject} skills and standards,
              helping identify where students need support and where they are excelling.
            </p>
          </div>

          <div className="proto-section-label">Student Performance by Domain</div>
          <div className="proto-card">
            <table className="data-table" style={{ fontSize: '0.8125rem' }}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Overall</th>
                  {skills.slice(0, 5).map(sk => (
                    <th key={sk.id} title={sk.name} style={{ maxInlineSize: '6rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {sk.code}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {studentScores.slice(0, 15).map(({ student, scores }) => {
                  const latest = scores.filter(sc =>
                    sc.assessmentId?.includes(cls.subject === 'ELA' ? 'sr' : 'sm')
                  ).sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))[0];
                  return (
                    <tr key={student.id}>
                      <td>
                        <Link href={`/prototype/students/${student.slug}`} style={{ fontWeight: 600, color: '#333', textDecoration: 'none' }}>
                          {student.name}
                        </Link>
                      </td>
                      <td>
                        {latest ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>{latest.value}</span>
                            {bandBadge(latest.proficiencyBand)}
                          </div>
                        ) : '—'}
                      </td>
                      {skills.slice(0, 5).map(sk => {
                        const breakdown = latest?.skillBreakdown?.find(b =>
                          sk.name.toLowerCase().includes(b.name.toLowerCase().split(' ')[0])
                        );
                        return (
                          <td key={sk.id}>
                            {breakdown ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <div style={{ inlineSize: '40px', blockSize: '4px', background: '#eee', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ blockSize: '100%', inlineSize: `${breakdown.percent}%`, background: breakdown.percent >= 70 ? '#2e7d32' : breakdown.percent >= 45 ? '#e65100' : '#c62828', borderRadius: '2px' }} />
                                </div>
                                <span style={{ fontSize: '0.6875rem' }}>{breakdown.percent}%</span>
                              </div>
                            ) : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Groups' && (
        <div className="grid" style={{ '--minimum': '18rem' } as React.CSSProperties}>
          {groups.map(g => (
            <div key={g.id} className="proto-card">
              <div style={{ fontWeight: 600, color: '#333', marginBlockEnd: 'var(--s-2)' }}>{g.name}</div>
              <div style={{ fontSize: '0.8125rem', color: '#666', marginBlockEnd: 'var(--s-2)' }}>
                {g.groupingCriteria}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                <span style={{ color: '#999' }}>{g.studentCount} students</span>
                <span className="proto-badge proto-badge--active">{g.status}</span>
              </div>
              {g.associatedSkill && (
                <div style={{ marginBlockStart: 'var(--s-2)', fontSize: '0.75rem', color: '#999' }}>
                  Skill: {g.associatedSkill}
                </div>
              )}
              {g.source && (
                <div style={{ fontSize: '0.75rem', color: '#999' }}>
                  Source: {g.source}
                </div>
              )}
            </div>
          ))}
          {groups.length === 0 && (
            <div className="proto-empty">
              <span className="material-icons" aria-hidden="true">group_work</span>
              <p>No student groups for this class yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Reports' && (
        <div className="stack" style={{ '--space': 'var(--s-1)' } as React.CSSProperties}>
          {reports.map(r => (
            <Link key={r.id} href={`/prototype/reports/${r.id}`} className="proto-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}>
              <div>
                <div style={{ fontWeight: 600, color: '#333' }}>
                  {r.reportType}{r.lessonTitle ? `: ${r.lessonTitle}` : ''}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#666' }}>
                  {r.generatedDate ? new Date(r.generatedDate).toLocaleDateString() : ''} · {r.studentCount} students
                </div>
              </div>
              <span className="proto-badge proto-badge--completed">{r.status}</span>
            </Link>
          ))}
          {reports.length === 0 && (
            <div className="proto-empty">
              <span className="material-icons" aria-hidden="true">bar_chart</span>
              <p>No reports for this class yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
