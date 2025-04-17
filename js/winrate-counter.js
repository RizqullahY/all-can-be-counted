function calculateWinrate() {
    const currentWinrate = parseFloat($("#currentWinrate").val());
    const totalMatches = parseFloat($("#totalMatches").val());
    const targetWinrate = parseFloat($("#targetWinrate").val());
    const resultDiv = $("#result");
  
    // Reset hasil
    resultDiv.html("");
  
    if (!isValidInput(currentWinrate, totalMatches, targetWinrate)) {
      return;
    }
  
    const expectedWins = (currentWinrate / 100) * totalMatches;
    if (!Number.isInteger(expectedWins)) {
      resultDiv.html(
        `<p class='text-red-500'>Winrate <strong>${currentWinrate}%</strong> tidak valid untuk <strong>${totalMatches}</strong> match.<br>
        Pastikan winrate sesuai dengan hasil nyata pertandingan (misal: 1 win dari 2 match = 50%).</p>`
      );
      return;
    }
  
    const currentWins = expectedWins;
  
    if (targetWinrate > currentWinrate) {
      showWinsNeeded(currentWinrate, totalMatches, currentWins, targetWinrate, resultDiv);
    } else if (targetWinrate < currentWinrate) {
      showLossesNeeded(currentWinrate, totalMatches, currentWins, targetWinrate, resultDiv);
    } else {
      resultDiv.html(
        `<p>Winrate kamu <strong>${currentWinrate.toFixed(
          2
        )}%</strong> sudah sesuai dengan target.</p>`
      );
    }
  }
  
  function isValidInput(currentWinrate, totalMatches, targetWinrate) {
    const resultDiv = $("#result");
  
    if (
      isNaN(currentWinrate) ||
      isNaN(totalMatches) ||
      isNaN(targetWinrate)
    ) {
      resultDiv.html(
        "<p class='text-red-500'>Mohon isi semua input dengan benar.</p>"
      );
      return false;
    }
  
    // Validasi jumlah angka di belakang koma (maks 2)
    if (
      hasTooManyDecimals($("#currentWinrate").val()) ||
      hasTooManyDecimals($("#targetWinrate").val())
    ) {
      resultDiv.html(
        "<p class='text-red-500'>Winrate tidak boleh lebih dari 2 angka di belakang koma. Contoh: 75.25 atau 60.5</p>"
      );
      return false;
    }
  
    if (!(currentWinrate === 100) && targetWinrate === 100) {
      resultDiv.html(
        "<p class='text-red-500'>Target winrate 100% tidak bisa dicapai jika winrate sekarang belum 100%.</p>"
      );
      return false;
    }
  
    if (totalMatches < 0) {
      resultDiv.html("<p class='text-red-500'>Jumlah pertandingan tidak boleh negatif.</p>");
      return false;
    }
  
    if (targetWinrate < 0 || targetWinrate > 100) {
      resultDiv.html(
        "<p class='text-red-500'>Target winrate harus berada antara 0% dan 100%.</p>"
      );
      return false;
    }
  
    return true;
  }
  
  function hasTooManyDecimals(value) {
    const parts = value.toString().split(".");
    return parts.length > 1 && parts[1].length > 2;
  }
  
  function showWinsNeeded(currentWinrate, totalMatches, currentWins, targetWinrate, resultDiv) {
    let winsNeeded = 0;
    let newTotalMatches = totalMatches;
  
    while (
      ((currentWins + winsNeeded) / (newTotalMatches + winsNeeded)) * 100 <
      targetWinrate
    ) {
      winsNeeded++;
    }
  
    resultDiv.html(`
      <p class="text-wrap">Dengan winrate sekarang <strong>${currentWinrate.toFixed(
        2
      )}%</strong> dari <strong>${totalMatches}</strong> pertandingan,</p>
      <p class="text-wrap">Kamu perlu memenangkan <strong>${winsNeeded}</strong> pertandingan berturut-turut untuk mencapai winrate <strong>${targetWinrate.toFixed(
      2
    )}%</strong>.</p>
    `);
  }
  
  function showLossesNeeded(currentWinrate, totalMatches, currentWins, targetWinrate, resultDiv) {
    let lossesNeeded = 0;
    let newTotalMatches = totalMatches;
  
    while (
      (currentWins / (newTotalMatches + lossesNeeded)) * 100 >
      targetWinrate
    ) {
      lossesNeeded++;
    }
  
    resultDiv.html(`
      <p class="text-wrap">Dengan winrate sekarang <strong>${currentWinrate.toFixed(
        2
      )}%</strong> dari <strong>${totalMatches}</strong> pertandingan,</p>
      <p class="text-wrap">Kamu akan mencapai winrate <strong>${targetWinrate.toFixed(
      2
    )}%</strong> jika mengalami <strong>${lossesNeeded}</strong> kekalahan berturut-turut.</p>
    `);
  }
  