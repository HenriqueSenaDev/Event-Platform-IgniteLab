import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
    title: string,
    slug: string,
    availableAt: Date,
    type: 'live' | 'class'
}

const Lesson = (props: LessonProps) => {
    const { slug } = useParams<{ slug: string }>();

    const availableFormattedDate = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
    });

    const isActiveLesson = slug === props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className='text-gray-300'>
                {availableFormattedDate}
            </span>

            <div className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors text-sm', {
                'bg-green-500': isActiveLesson
            })}>
                <header className='flex items-center justify-between'>
                    {isPast(props.availableAt) ? (
                        <span className={classNames('text-smtext-blue-500 font-medium flex items-center gap-2', {
                            'text-white': isActiveLesson,
                            'text-blue-500': !isActiveLesson,

                        })}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className='text-sm text-orange-500 font-medium flex items-center gap-2'>
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}

                    <span className={classNames('text-xs rounded border px-2 py-[2px] text-white font-bold', {
                        'border-green-300': !isActiveLesson,
                        'border-white': isActiveLesson,
                    })}>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>
                <strong className={classNames('mt-5 block', {
                    'text-gray-200': !isActiveLesson,
                    'text-white': isActiveLesson
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    );
}

export default Lesson;