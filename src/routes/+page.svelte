<script>
  import { enhance } from '$app/forms';

  export let data;
  export let form;

  // 데이터베이스 연결 상태 표시용
  $: dbError = data.error;
  $: entries = data.entries || [];
</script>

<svelte:head>
  <title>방명록 | Cloudflare Pages</title>
  <meta name="description" content="Cloudflare D1 기반 방명록입니다." />
</svelte:head>

<div class="container">
  <h1>📖 방명록</h1>
  
  {#if dbError}
    <div class="error-message">
      <strong>데이터베이스 연결 오류:</strong> {dbError}
      <p>💡 <em>로컬 개발 시 `bun run dev --d1` 또는 `wrangler pages dev` 명령어를 사용해야 D1 바인딩이 작동할 수 있습니다.</em></p>
    </div>
  {/if}

  <section class="form-section">
    <h2>남기기</h2>
    <form method="POST" use:enhance>
      <div class="input-group">
        <label for="name">이름</label>
        <input type="text" id="name" name="name" required placeholder="이름을 입력하세요" />
      </div>

      <div class="input-group">
        <label for="content">내용</label>
        <textarea id="content" name="content" required placeholder="방명록 내용을 입력하세요" rows="3"></textarea>
      </div>

      <button type="submit">등록</button>

      {#if form?.error}
        <p class="error">{form.error}</p>
      {/if}
      {#if form?.success}
        <p class="success">성공적으로 등록되었습니다!</p>
      {/if}
    </form>
  </section>

  <section class="list-section">
    <h2>목록 ({entries.length})</h2>
    
    {#if entries.length === 0}
      <p class="empty">아직 등록된 방명록이 없습니다. 첫 번째 글을 남겨보세요!</p>
    {:else}
      <ul class="entries">
        {#each entries as entry}
          <li class="entry-card">
            <div class="header">
              <span class="author">{entry.name}</span>
              <span class="date">{new Date(entry.created_at * 1000).toLocaleString()}</span>
            </div>
            <p class="content">{entry.content}</p>
          </li>
        {/each}
      </ul>
    {/if}
  </section>
</div>

<style>
  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f7f9fc;
    color: #333;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 2rem;
  }

  h2 {
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    color: #34495e;
  }

  .form-section {
    margin-bottom: 3rem;
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
  }

  .input-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  input, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box; /* 중요 */
  }

  input:focus, textarea:focus {
    border-color: #3498db;
    outline: none;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }

  button {
    background-color: #3498db;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #2980b9;
  }

  .entries {
    list-style: none;
    padding: 0;
  }

  .entry-card {
    background: white;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .entry-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
    color: #7f8c8d;
  }

  .author {
    font-weight: bold;
    color: #2c3e50;
  }

  .content {
    margin: 0;
    white-space: pre-wrap;
  }

  .error-message {
    background: #ffebee;
    color: #c62828;
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 2rem;
    border-left: 4px solid #c62828;
  }

  .empty {
    text-align: center;
    color: #95a5a6;
    padding: 2rem;
  }

  .success {
    color: #27ae60;
    margin-top: 0.5rem;
    font-weight: bold;
  }
  
  .error {
    color: #c0392b;
    margin-top: 0.5rem;
  }
</style>
