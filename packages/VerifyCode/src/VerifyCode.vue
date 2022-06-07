<template>
    <div class="img-verify">
        <canvas ref="verify" width="120" height="40" @click="handleDraw"></canvas>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs, onMounted } from "vue";
const verify = ref(null);
const state = reactive({
    pool: "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    imgCode: "",
});

onMounted(() => {
    // 开始绘制图片验证码
    state.imgCode = draw();
});

const handleDraw = () => {
    state.imgCode = draw()
}

// 生成随机数
const randomNum = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
};

// 生成随机颜色
const randomColor = (min, max) => {
    const r = randomNum(min, max);
    const g = randomNum(min, max);
    const b = randomNum(min, max);
    return `rgb(${r},${g},${b})`;
};

const draw = () => {
    // 绘制图片
    const ctx = verify.value.getContext("2d");
    // 填充颜色
    ctx.fillStyle = randomColor(180, 230);
    // 填充的位置
    ctx.fillRect(0, 0, 120, 40);
    // 生成随机的值
    let imgCode = "";
    for (let i = 0; i < 4; i++) {
        const text = state.pool[randomNum(0, state.pool.length)];
        imgCode += text;
        // 随机字体大小
        const fontSize = randomNum(18, 40);
        // 随机字体旋转角度
        const deg = randomNum(-30, 30);

        ctx.font = fontSize + "px Simhei";
        ctx.textBaseline = "top";
        ctx.fillStyle = randomColor(80, 150);
        ctx.save();
        ctx.translate(30 * i + 15, 15);
        ctx.rotate((deg * Math.PI) / 180);

        ctx.fillText(text, -15 + 5, -15);
        ctx.restore();
    }

    // 5.随机产生5条干扰线,干扰线的颜色要浅一点
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(randomNum(0, 120), randomNum(0, 40));
        ctx.lineTo(randomNum(0, 120), randomNum(0, 40));
        ctx.strokeStyle = randomColor(180, 230);
        ctx.closePath();
        ctx.stroke();
    }
    // 6.随机产生40个干扰的小点
    for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(
            randomNum(0, 120),
            randomNum(0, 40),
            1,
            0,
            2 * Math.PI
        );
        ctx.closePath();
        ctx.fillStyle = randomColor(150, 200);
        ctx.fill();
    }
    return imgCode
};



</script>

<style scoped>
.img-verify {
    cursor: pointer;
}
</style>