import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface LessonProps {
    title: string,
    slug: string,
    availableAt: Date,
    type: 'live' | 'class'
}

const Lesson = (props: LessonProps) => {
    const availableFormattedDate = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
    });

    return (
        <a href='#'>
            <span className='text-gray-300'>
                {availableFormattedDate}
            </span>

            <div className='rounded border border-gray-500 p-4 mt-2'>
                <header className='flex items-center justify-between'>
                    {isPast(props.availableAt) ? (
                        <span className='text-sm text-blue-500 font-medium flex items-center gap-2'>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className='text-sm text-orange-500 font-medium flex items-center gap-2'>
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}

                    <span className='text-xs rounded border border-green-300 px-2 py-[2px] text-white font-bold'>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>
                <strong className='text-gray-300 mt-5 block'>
                    {props.title}
                </strong>
            </div>
        </a>
    );
}

export default Lesson;