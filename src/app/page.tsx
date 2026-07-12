import { answers, curriculumNodes, questions, students } from "@/data/demo";
import { scorePercent } from "@/lib/evaluation";
import { runDemoWorkflow } from "@/lib/workflow";

const workflow = runDemoWorkflow();
const question = questions[0];
const curriculum = curriculumNodes.find((node) => node.id === question.curriculumNodeId)!;

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 lg:px-12">
      <section className="mx-auto grid max-w-7xl gap-6">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm font-black uppercase tracking-[0.25em]">Classroom Intelligence</div>
          <div className="rounded-full border-3 border-black bg-[#8ff0c2] px-4 py-2 text-sm font-black shadow-[4px_4px_0_#111827]">
            Hermes Desktop + Convex-ready
          </div>
        </nav>

        <header className="neo-card grid gap-6 bg-[#ffd84d] p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-10">
          <div>
            <p className="mb-3 inline-block border-3 border-black bg-white px-3 py-1 text-sm font-black uppercase shadow-[3px_3px_0_#111827]">
              CBSE Grade 8 Mathematics
            </p>
            <h1 className="max-w-4xl text-5xl leading-[0.95] font-black tracking-tight sm:text-7xl">
              Turn student answers into next week&apos;s teaching plan.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-bold">
              A fast hackathon MVP: seeded class, rubric-based evaluation, class intelligence, weekly planner, voice-input surface,
              and sponsor story without a parallel OpenAI app layer.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="neo-button px-5 py-3" href="#demo">
                Run demo flow
              </a>
              <a className="neo-button bg-[#73c7ff] px-5 py-3" href="#planner">
                View weekly plan
              </a>
            </div>
          </div>
          <div className="neo-card rotate-1 bg-white p-5">
            <h2 className="text-2xl font-black">Live workflow state</h2>
            <div className="mt-4 grid gap-3">
              {workflow.events.map((event) => (
                <div key={event.stage} className="border-3 border-black bg-[#fff8e7] p-3 shadow-[3px_3px_0_#111827]">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="uppercase">{event.stage}</strong>
                    <span className="rounded-full border-2 border-black bg-[#b69cff] px-2 py-1 text-xs font-black">
                      {event.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold">{event.message}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section id="demo" className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="neo-card bg-white p-6">
            <h2 className="text-3xl font-black">Assessment</h2>
            <p className="mt-2 text-sm font-black text-neutral-600 uppercase">
              {curriculum.board} · Grade {curriculum.grade} · {curriculum.subject}
            </p>
            <h3 className="mt-4 text-xl font-black">{curriculum.chapter}</h3>
            <p className="mt-3 text-lg font-bold">{question.text}</p>
            <div className="mt-5 grid gap-3">
              {question.rubric.map((point) => (
                <div key={point.id} className="border-3 border-black bg-[#8ff0c2] p-3 shadow-[3px_3px_0_#111827]">
                  <strong>{point.marks} marks</strong>
                  <p className="font-bold">{point.criterion}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 border-3 border-dashed border-black bg-[#ff7ab6] p-4 font-black">
              Wispr Flow surface: dictate assessment prompts, rubrics, comments, and planner constraints directly into editable fields.
            </div>
          </article>

          <article className="neo-card bg-white p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-3xl font-black">Teacher review queue</h2>
                <p className="font-bold">
                  Hermes Desktop agents provide reasoning; this app validates bounds and keeps teacher approval mandatory.
                </p>
              </div>
              <div className="border-3 border-black bg-[#ffd84d] px-4 py-2 text-2xl font-black shadow-[3px_3px_0_#111827]">
                {workflow.insight.averageScorePercent}% avg
              </div>
            </div>
            <div className="mt-5 grid gap-4">
              {workflow.evaluations.map((evaluation) => {
                const answer = answers.find((item) => item.id === evaluation.answerId)!;
                const student = students.find((item) => item.id === answer.studentId)!;
                return (
                  <div key={evaluation.answerId} className="border-3 border-black bg-[#fff8e7] p-4 shadow-[4px_4px_0_#111827]">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-black">{student.name}</h3>
                      <span className="rounded-full border-2 border-black bg-white px-3 py-1 font-black">
                        {evaluation.awardedMarks}/{evaluation.maxMarks} · {scorePercent(evaluation)}%
                      </span>
                    </div>
                    <p className="mt-2 border-l-4 border-black pl-3 font-bold">“{answer.rawResponse}”</p>
                    <p className="mt-3 font-black">
                      Misconception: <span className="font-bold">{evaluation.misconception}</span>
                    </p>
                    <p className="mt-2 font-black">
                      Feedback: <span className="font-bold">{evaluation.feedback}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm font-black">
                      <span className="border-2 border-black bg-[#73c7ff] px-2 py-1">
                        confidence {Math.round(evaluation.confidence * 100)}%
                      </span>
                      <span className="border-2 border-black bg-[#ff9f45] px-2 py-1">
                        {evaluation.reviewRequired ? "teacher review required" : "ready to approve"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <article className="neo-card bg-[#73c7ff] p-6">
            <h2 className="text-2xl font-black">Class intelligence</h2>
            <ul className="mt-4 grid gap-3 font-bold">
              {workflow.insight.reteachingPriorities.map((priority) => (
                <li key={priority}>↳ {priority}</li>
              ))}
            </ul>
          </article>
          <article className="neo-card bg-[#b69cff] p-6">
            <h2 className="text-2xl font-black">Linkup resource slot</h2>
            <p className="mt-4 font-bold">
              Enrichment is optional and teacher-removable. It never defines official CBSE curriculum nodes.
            </p>
          </article>
          <article className="neo-card bg-[#ff9f45] p-6">
            <h2 className="text-2xl font-black">ElevenLabs limited path</h2>
            <p className="mt-4 font-bold">
              Generate one approved spoken concept explanation after text preview; audio is not part of grading.
            </p>
          </article>
        </section>

        <section id="planner" className="neo-card bg-white p-6">
          <h2 className="text-3xl font-black">Editable weekly plan</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {workflow.weeklyPlan.map((day) => (
              <article key={day.day} className="border-3 border-black bg-[#fff8e7] p-4 shadow-[4px_4px_0_#111827]">
                <h3 className="text-xl font-black">{day.day}</h3>
                <p className="mt-2 font-black">{day.objective}</p>
                <p className="mt-3 text-sm font-bold">Activity: {day.activity}</p>
                <p className="mt-3 text-sm font-bold">Check: {day.formativeCheck}</p>
                {day.resources.length > 0 && (
                  <p className="mt-3 border-2 border-black bg-[#8ff0c2] p-2 text-sm font-black">{day.resources[0]}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
