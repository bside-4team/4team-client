'use client';

import CHeader from '@/components/c-header';
import CMypageMenu from '@/components/c-mypage-menu';
import GNBLayout from '@/components/layout/gnb-layout';
import { MODAL_TYPES } from '@/components/Modal/GlobalModal';
import useModal from '@/components/Modal/GlobalModal/hooks/useModal';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useLogoutMutate from '../login/hooks/useLogoutMutate';
import * as S from './page.styled';

export default function MyPage() {
  const { push } = useRouter();
  const { isLoggedIn, token, data } = useUser();
  const { openModal, closeModal } = useModal();
  const { mutate: logoutMutate } = useLogoutMutate();

  const logoutModal = () => {
    openModal(MODAL_TYPES.dialog, {
      title: '로그아웃 하시겠습니까?',
      cancelText: '취소',
      needClose: true,
      handleClose: () => closeModal(MODAL_TYPES.dialog),
      handleConfirm: () => {
        if (token) logoutMutate({ token });
      },
    });
  };

  return (
    <>
      <CHeader title="마이페이지" isLogo />

      <GNBLayout>
        {isLoggedIn ? (
          // 호진FIXME: 해당 부분 컴포넌트화 가능한 로직!
          <S.NotLogInContainer>
            <div>
              <p className="flex cursor-pointer !font-pretendard text-xl font-bold" onClick={() => push('/login')}>
                {data?.nickname}
                <Image src={'/image/Mypage/arrow_right.svg'} width={24} height={24} alt="arrow_right" />
              </p>
              <p className="mt-3 !font-pretendard text-sm">{data?.account?.accountEmail}</p>
            </div>
          </S.NotLogInContainer>
        ) : (
          <S.NotLogInContainer>
            <div>
              <p className="flex cursor-pointer !font-pretendard text-xl font-bold" onClick={() => push('/login')}>
                로그인 <Image src={'/image/Mypage/arrow_right.svg'} width={24} height={24} alt="arrow_right" />
              </p>
              <p className="mt-3 !font-pretendard text-sm">맛셔너리 서비스 이용을 위해 로그인해주세요.</p>
            </div>
          </S.NotLogInContainer>
        )}

        <S.MenuList>
          {isLoggedIn && (
            <CMypageMenu
              items={[
                { name: '개인정보 관리', clickEvent: () => push('/mypage/user/manage-info') },
                { name: '작성한 리뷰 관리' },
                { name: '북마크 식당 관리' },
                { name: '추천 제외 식당 보기' },
              ]}
            />
          )}

          <CMypageMenu
            items={[
              {
                name: '공지사항',
                clickEvent: () =>
                  window.open(
                    'https://tastetionary.notion.site/03ebf00931f44926b889e085cabbd02c?v=5c1337997b384b15a63e6d89a3708ed9&pvs=74'
                  ),
              },
              { name: '자주 묻는 질문' },
              { name: '의견 보내기', mail: 'tastetionary@gmail.com' },
            ]}
          />

          <CMypageMenu
            items={[
              { name: '서비스 이용약관', clickEvent: () => push('/sign-up?step=terms-of-service') },
              { name: '개인정보 처리 방침', clickEvent: () => push('/sign-up?step=privacy-notice') },
            ]}
          />
          {isLoggedIn && <CMypageMenu items={[{ name: '로그아웃', clickEvent: () => logoutModal() }]} />}
        </S.MenuList>
      </GNBLayout>
    </>
  );
}
