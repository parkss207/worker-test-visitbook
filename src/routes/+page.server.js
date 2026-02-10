
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ platform }) => {
    // 로컬 개발 환경에서는 platform이 없을 수 있음 (miniflare 사용 시)
    if (!platform?.env?.DB) {
        return {
            entries: [],
            error: 'Cloudflare D1 binding을 찾을 수 없습니다. (배포 후 확인하거나 로컬 프록시 설정 필요)'
        };
    }

    try {
        const { results } = await platform.env.DB.prepare(
            'SELECT * FROM guestbook ORDER BY created_at DESC LIMIT 50'
        ).all();

        return {
            entries: results
        };
    } catch (err) {
        console.error('DB 조회 실패:', err);
        return {
            entries: [],
            error: '데이터베이스 조회 중 오류가 발생했습니다. (' + err.message + ')'
        };
    }
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, platform }) => {
        if (!platform?.env?.DB) {
            return { success: false, error: 'Database binding not found' };
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const content = formData.get('content');

        if (!name || !content) {
            return { success: false, error: '이름과 내용을 모두 입력해주세요.' };
        }

        try {
            // D1 쿼리 실행
            const result = await platform.env.DB.prepare(
                'INSERT INTO guestbook (name, content) VALUES (?, ?)'
            )
                .bind(name, content)
                .run();

            if (!result.success) {
                throw new Error('D1 operation failed');
            }

            return { success: true };
        } catch (err) {
            console.error('DB 저장 실패:', err);
            return { success: false, error: '저장 중 오류가 발생했습니다. (' + err.message + ')' };
        }
    }
};
