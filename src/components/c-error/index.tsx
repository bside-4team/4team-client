import IC_ERROR from '@/assets/common/img_error.svg';
import IC_READY from '@/assets/common/img_ready.svg';
import { useRouter } from 'next/navigation';
import MainButton from '../Button/MainButton';
import CHeader from '../c-header';

interface Props {
  type: '404' | 'ready';
}

export default function CError({ type }: Props) {
  const router = useRouter();

  return (
    <>
      <CHeader title="" isBackBtn />

      <div className="mt-60 flex flex-col items-center justify-center gap-37 px-20 pb-40 pt-0">
        {type === '404' ? <IC_ERROR /> : <IC_READY />}

        <div className="mb-138 flex flex-col items-center justify-center gap-15">
          <div className="text text-center text-20 font-bold leading-[150%]">
            {type === '404' ? '페이지 경로가 올바르지 않습니다.' : '서비스 준비중입니다.'}
          </div>

          <p className="whitespace-pre-line break-keep px-20 text-center text-14 leading-[160%] text-neutral-bg40">
            {type === '404'
              ? '접근 방법이 잘못되어 페이지를 연결할 수 없습니다. 이용에 불편을 드려 죄송합니다.'
              : '현재 페이지는 서비스를 준비하고 있어요.\n빠른 시일 내에 만나뵐 수 있도록\n최선을 다 할게요 :)'}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white px-20 pb-40 pt-0 mobile:fixed">
        <MainButton btnText="홈 화면으로" onClick={() => router.push('/')} />
      </div>
    </>
  );
}
