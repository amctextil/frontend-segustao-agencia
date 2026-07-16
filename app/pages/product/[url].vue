<!-- eslint-disable vue/no-v-html -->
<template>
  <NuxtLayout name="main">
    <div class="d-flex pa-4 ga-4 flex-column overflow-auto">
      <div class="d-flex ga-4">
        <v-carousel>
          <v-carousel-item
            v-for="media in medias"
            :key="media.MediaPath"
            :src="'https://d3vnyi5j6ba1mc.cloudfront.net' + media.MediaPath"
          />
        </v-carousel>

        <div class="d-flex flex-column ga-4">
          <h1 class="text-display-small">{{ product.Name }}</h1>

          <span>Ref: {{ product.IntegrationID }}</span>

          <span
            v-if="product.PromotionPrice"
            class="text-grey text-decoration-line-through"
          >
            {{ WDFormatters.formatCurrency(product.ListPrice) }}
          </span>

          <span class="text-display-small font-weight-bold">
            {{
              product.PromotionPrice
                ? WDFormatters.formatCurrency(product.PromotionPrice)
                : WDFormatters.formatCurrency(product.ListPrice)
            }}
          </span>

          <v-btn> Adicionar </v-btn>
        </div>
      </div>

      <div v-for="desc in descriptions" :key="desc.Alias" v-html="desc.Value" />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDFormatters } from 'widelab-utils';
import { ProductService } from '~/services/product.service';

const route = useRoute();
const { user } = useUserSession();

const productUrl = route.params.url as string;

const product = await ProductService.getProductByUrl(
  productUrl,
  user.value!.appId,
);

if (!product) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Produto não encontrado',
  });
}

const options = ref<{ [title: string]: string }>({});

const medias = computed(() => {
  const allMedias = product.Medias.filter(
    (media) => media.MediaSizeType === 'Medium',
  );

  if (!options.value.Cor) {
    return allMedias;
  }

  const variantMedias = allMedias?.filter(
    (media) =>
      !!(options.value.Cor && media.VariationPath.includes(options.value.Cor)),
  );

  return variantMedias?.length ? variantMedias : allMedias;
});

const descriptions = product.Descriptions.filter((item) => item.Value);

console.log('🚀 ~ product.Descriptions:', product.Descriptions);
</script>

<style></style>
